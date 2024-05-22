import {StyleSheet, View} from 'react-native';
import React, {forwardRef, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import StickerGroup from './StickerGroup';
import {stickerList} from '../../../constants/list';
import StickerItem from './StickerItem';
import {StickerProps} from '../../../type';
import {stickerSize, videoHeight, width} from '../../../constants/other';
interface StickerPickerProps {
  stickerPicker?: StickerProps;
  onPickerSticker: (n: StickerProps) => void;
}

const StickerPicker = (
  {stickerPicker, onPickerSticker}: StickerPickerProps,
  ref: any,
) => {
  const snapPoint = useMemo(() => [`41%`], []);
  const groupRef = useRef(null);

  const stickerGroupIdx = Math.floor((stickerPicker?.sticker - 3) / 16);
  const [stickerGroupPicker, setStickerGroupPicker] = useState(
    stickerGroupIdx || 0,
  );
  const [currStickerList, setCurrStickerList] = useState(
    stickerList[stickerGroupPicker],
  );

  const handleGroupChange = (idx: number) => {
    setStickerGroupPicker(idx);
    setCurrStickerList(stickerList[idx]);
  };

  const handlePickSticker = (sticker: number) => {
    const stickerObj: StickerProps = {
      sticker,
      x: width / 2 - stickerSize / 2,
      y: videoHeight / 2 - stickerSize / 2,
      startTime: 0,
      endTime: 2,
      type: 'sticker',
    };

    onPickerSticker(stickerObj);
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoint}
      index={-1}
      handleComponent={null}
      backgroundStyle={{backgroundColor: 'black', borderRadius: 0}}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0}
          enableTouchThrough={true}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}>
      <View style={styles.stickerContainer}>
        <StickerGroup
          ref={groupRef}
          currGroup={stickerGroupPicker}
          onChangeGroup={handleGroupChange}
        />
        <StickerItem
          data={currStickerList}
          stickerPicker={stickerPicker?.sticker}
          onStickerPicker={handlePickSticker}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  stickerContainer: {
    flex: 1,
    padding: 10,
  },
});

export default forwardRef(StickerPicker);
