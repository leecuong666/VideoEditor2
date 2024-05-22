import {ScrollView, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import VideoDuration from '../../../components/VideoDuration';
import VideoTimeline from '../../../components/VideoTimeline';
import BtnCustom from '../../../components/BtnCustom';
import {StickerIcon, TextIcon} from '../../../constants/svg';
import fonts from '../../../constants/fonts';
import colors from '../../../constants/colors';
import {width} from '../../../constants/other';
import {StickerProps, TextProps} from '../../../type';
import ListItem from './ListItem';
import {timeline} from '../../../constants/other';

const {timelineW, framesPerSec} = timeline;

interface VideoTimelineProps {
  listItem: (TextProps | StickerProps)[];
  itemPicker?: number;
  duration: number;
  timelineData: string[];
  onTimelineScroll: (data: number) => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onAddText: () => void;
  onAddSticker: () => void;
  onPickItem: (i: number) => void;
  onItemSizeChange: (x: number, y: number) => void;
}

const TimelineVideo = ({
  listItem,
  itemPicker,
  duration,
  timelineData,
  onTimelineScroll,
  onTouchStart,
  onTouchEnd,
  onAddSticker,
  onAddText,
  onPickItem,
  onItemSizeChange,
}: VideoTimelineProps) => {
  const isShowBtn = listItem.length === 0;

  const handleScroll = (e: any) => {
    const {contentOffset} = e.nativeEvent;

    onTimelineScroll(contentOffset.x);
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      scrollEventThrottle={345}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      horizontal
      removeClippedSubviews={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.durationContainer}>
      <View>
        <VideoDuration duration={duration} style={{marginBottom: 4}} />

        <VideoTimeline
          timelineData={timelineData}
          containerStyle={{marginBottom: 4}}
        />

        {isShowBtn && (
          <BtnCustom
            leftIcon={<TextIcon />}
            text="Tab to add text"
            color="white"
            fontSize={16}
            fontFamily={fonts.regular}
            btnStyle={styles.btnCustom}
            textStyle={styles.textCustom}
            onEvent={onAddText}
          />
        )}

        {isShowBtn && (
          <BtnCustom
            leftIcon={<StickerIcon />}
            text="Tab to add sticker"
            color="white"
            fontSize={16}
            fontFamily={fonts.regular}
            btnStyle={styles.btnCustom}
            textStyle={styles.textCustom}
            onEvent={onAddSticker}
          />
        )}

        <ListItem
          data={listItem}
          itemPicker={itemPicker}
          minWidthItem={timelineW * 2}
          maxWidthItem={(timelineW / framesPerSec) * timelineData.length}
          onItemPicker={onPickItem}
          onItemSizeChange={onItemSizeChange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  durationContainer: {
    flexGrow: 1,
    paddingHorizontal: width / 2,
  },

  btnCustom: {
    borderWidth: 1,
    borderColor: colors.gray2,
    backgroundColor: colors.black,
    paddingLeft: 16,
    paddingVertical: 7,
    justifyContent: 'flex-start',
    marginBottom: 5,
    width: width / 1.5,
  },

  textCustom: {
    marginLeft: 12,
  },
});

export default memo(TimelineVideo);
