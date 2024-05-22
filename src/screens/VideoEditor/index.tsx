import {Alert, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VideoEditorHeader from './VideoEditorHeader/VideoEditorHeader';
import VideoPlayer from '../../components/VideoPlayer';
import {MediaProps, StickerProps, TextProps, itemType} from '../../type';
import {
  height,
  timeline,
  videoEditedPath,
  videoStoragePath,
  width,
} from '../../constants/other';
import TimelineVideo from './VideoTimeline/VideoTimeline';
import AddAction from './AddAction/AddAction';
import EditAction from './EditAction/EditAction';
import StickerPicker from './StickerPicker/StickerPicker';
import TextPicker from './TextPicker/TextPicker';
import {runOnJS} from 'react-native-reanimated';
import ModalCustom from '../../components/ModalCustom';
import ListItemOveride from './ListItemOveride/ListItemOveride';
import VideoExport from './VideoExport/VideoExport';
import {
  generateThumbnail,
  generateVidId,
  generateVideoTimeline,
  processItemIntoVideo,
} from '../../util/video';
import {useRealm} from '@realm/react';
import {MediaEdited} from '../../database/models';

const {timelineW} = timeline;

const VideoEditor = ({navigation, route}: any) => {
  const video: MediaProps = route.params;
  const {name, timelineData, duration, thumbnail, typeVid} = video;
  const uri =
    (typeVid === 'videoEdited' ? videoEditedPath : videoStoragePath) +
    '/' +
    name;

  const {top, bottom} = useSafeAreaInsets();

  const realm = useRealm();

  const vidRef = useRef(null);
  const stickerRef = useRef(null);

  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const [toggleVidExport, setToggleVidExport] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [listItem, setListItem] = useState<(TextProps | StickerProps)[]>([]);
  const [itemPicker, setItemPicker] = useState(-1);
  const [toggleTextEditor, setToggleTextEditor] = useState(false);
  const [rootVideoSize, setRootVideoSize] = useState({w: 0, h: 0});

  const handleToggleModal = () => {
    if (listItem.length > 0) {
      setToggleConfirmModal(true);
    } else {
      handleBack();
    }
  };
  const closeModal = () => {
    setToggleConfirmModal(false);
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const handleStopResume = () => {
    setIsPause(!isPause);
  };
  const handleResume = () => {
    setIsPause(false);
  };
  const handleStop = () => {
    setIsPause(true);
  };

  const handleExport = () => {
    setToggleVidExport(true);
    handleStop();
  };
  const closeVidExport = () => {
    setToggleVidExport(false);
  };

  const handleTimelineScroll = useCallback((x: number) => {
    vidRef.current?.seek(x / timelineW);
  }, []);

  const openTextEditor = () => {
    setIsPause(true);
    setToggleTextEditor(true);
  };
  const closeTextEditor = () => {
    setToggleTextEditor(false);
  };
  const handleSaveTextEditor = (textObj: TextProps) => {
    handlePickSticker(textObj);

    closeTextEditor();
  };
  const handleUpdateText = (textObj: TextProps) => {
    let newList = [...listItem];
    const {text, fontFamily, color, bgColor} = textObj;

    const updateText: TextProps = {
      ...listItem[itemPicker],
      text,
      fontFamily,
      color,
      bgColor,
    };

    newList.splice(itemPicker, 1, updateText);

    setListItem(newList);
    closeTextEditor();
  };

  const handleOpenSticker = () => {
    stickerRef.current?.collapse();
  };
  const handlePickSticker = (obj: StickerProps | TextProps) => {
    const newList = [...listItem, obj];

    setListItem(newList);
    setItemPicker(newList.length - 1);
  };
  const handleUpdateSticker = (sticker: StickerProps) => {
    let newList = [...listItem];

    const newSticker: StickerProps = {
      ...newList[itemPicker],
      sticker: sticker.sticker,
    };

    newList.splice(itemPicker, 1, newSticker);

    setListItem(newList);
  };

  const handleItemPicker = (idx: number) => {
    itemPicker === idx ? handleActionBack() : setItemPicker(idx);
  };
  const handleItemSizeChange = (startTime: number, endTime: number) => {
    'worklet';

    let newList = [...listItem];

    const updateItemTime: TextProps | StickerProps = {
      ...newList[itemPicker],
      startTime,
      endTime,
    };

    newList.splice(itemPicker, 1, updateItemTime);

    runOnJS(setListItem)(newList);
  };
  const handleActionBack = () => {
    setItemPicker(-1);
  };
  const handleEdit = () => {
    const type: itemType = listItem[itemPicker].type;

    if (type === 'sticker') {
      handleOpenSticker();
    } else {
      openTextEditor();
    }
  };
  const handleCopy = () => {
    let newListItem = [...listItem];

    newListItem.splice(itemPicker, 0, newListItem[itemPicker]);

    setListItem(newListItem);
    setItemPicker(itemPicker + 1);
  };
  const handleRemove = () => {
    const newListItem = [...listItem];

    newListItem.splice(itemPicker, 1);

    setListItem(newListItem);
    handleActionBack();
  };

  const handleUpdateCoordinate = (data: {
    x: number;
    y: number;
    idx: number;
  }) => {
    const {x, y, idx} = data;
    let newList = [...listItem];

    const updateCoor = {
      ...newList[idx],
      x,
      y,
    };

    newList.splice(idx, 1, updateCoor);

    setListItem(newList);
  };

  const getRootSize = (data: {width: number; height: number}) => {
    const {width, height} = data;
    setRootVideoSize({w: width, h: height});
  };

  const storeVideoEdited = (obj: MediaProps) => {
    realm.write(() => {
      realm.create(MediaEdited, obj);
    });
  };

  const handleProcessVid = async (nameVid: string, state: string) => {
    try {
      const vidName = await processItemIntoVideo(
        uri,
        listItem,
        nameVid,
        rootVideoSize,
      );

      const path = videoEditedPath + '/' + vidName;
      const thumbnail = await generateThumbnail(path);
      const {duration, base64Arr} = await generateVideoTimeline(path);

      const newMedia: MediaProps = {
        id: generateVidId(),
        name: vidName,
        thumbnail,
        duration,
        timelineData: base64Arr,
      };

      storeVideoEdited(newMedia);

      if (state === 'saveAndWatch') {
        navigation.navigate('VideoEdited', {
          item: newMedia,
          navigationType: 'preview',
        });
      } else {
        Alert.alert('Stored video successfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeVidExport();
    }
  };

  return (
    <View style={[styles.container, {paddingTop: top, paddingBottom: bottom}]}>
      <VideoEditorHeader
        leftTextBtn="Back"
        rightTextBtn="Export"
        vidName={name}
        disableRightBtn={listItem.length === 0}
        onLeftBtn={handleToggleModal}
        onRightBtn={handleExport}
      />

      <VideoPlayer
        ref={vidRef}
        isPause={isPause}
        uri={uri}
        onStopResume={handleStopResume}
        getRootSize={getRootSize}
        controlStyle={styles.control}
        overrideVideoComponent={(extraProps: any) => (
          <ListItemOveride
            data={listItem}
            itemPicker={itemPicker}
            onUpdateCoordinate={handleUpdateCoordinate}
            onStartDrag={handleStop}
            onPickItem={handleItemPicker}
            {...extraProps}
          />
        )}
      />

      <View style={{flex: 1}}>
        <TimelineVideo
          itemPicker={itemPicker}
          listItem={listItem}
          duration={duration}
          timelineData={timelineData}
          onTimelineScroll={handleTimelineScroll}
          onTouchStart={handleStop}
          onTouchEnd={handleResume}
          onAddSticker={handleOpenSticker}
          onAddText={openTextEditor}
          onPickItem={handleItemPicker}
          onItemSizeChange={handleItemSizeChange}
        />

        <View style={styles.seperateContainer} pointerEvents="none">
          <View style={styles.seperate} />
        </View>
      </View>

      <View style={styles.bottomActionContainer}>
        {itemPicker >= 0 ? (
          <EditAction
            onBack={handleActionBack}
            onCopy={handleCopy}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ) : (
          <AddAction
            onAddSticker={handleOpenSticker}
            onAddText={openTextEditor}
          />
        )}
      </View>

      <StickerPicker
        ref={stickerRef}
        stickerPicker={listItem[itemPicker]}
        onPickerSticker={
          itemPicker >= 0 ? handleUpdateSticker : handlePickSticker
        }
      />

      <TextPicker
        isVisible={toggleTextEditor}
        uri={uri}
        textPicker={listItem[itemPicker]}
        vidName={name}
        onCancelTextEdit={closeTextEditor}
        onSaveTextEdit={
          itemPicker >= 0 ? handleUpdateText : handleSaveTextEditor
        }
      />

      <VideoExport
        isVisible={toggleVidExport}
        thumbnail={thumbnail}
        onBack={closeVidExport}
        onSave={handleProcessVid}
      />

      <ModalCustom
        isVisiable={toggleConfirmModal}
        mainText="Your project is not complete. Return without save?"
        leftBtnText="Return"
        rightBtnText="Continue"
        onClose={closeModal}
        onLeftBtn={handleBack}
        onRightBtn={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },

  control: {
    paddingHorizontal: 12,
  },

  seperateContainer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: width / 2,
    justifyContent: 'flex-end',
  },

  seperate: {
    height: '88%',
    borderWidth: 0.5,
    borderColor: 'white',
  },

  bottomActionContainer: {
    height: height * 0.07,
  },
});

export default VideoEditor;
