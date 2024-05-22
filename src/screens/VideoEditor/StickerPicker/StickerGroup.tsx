import {FlatList, StyleSheet, View} from 'react-native';
import React, {forwardRef, useCallback} from 'react';
import {
  Group1,
  Group2,
  Group3,
  Group4,
  Group5,
  Group6,
} from '../../../constants/svg';
import BtnCustom from '../../../components/BtnCustom';
import {width} from '../../../constants/other';
import colors from '../../../constants/colors';

interface StickerGroupProps {
  currGroup: number;
  onChangeGroup: (i: number) => void;
}

const stickerGroup = [
  <Group1 />,
  <Group2 />,
  <Group3 />,
  <Group4 />,
  <Group5 />,
  <Group6 />,
];

const iconSize = (width - 20) / 6;

const StickerGroup = (
  {currGroup, onChangeGroup}: StickerGroupProps,
  ref: any,
) => {
  const renderStickerGroup = useCallback(
    ({item, index}: any) => {
      const isSelected = currGroup === index;

      return (
        <BtnCustom
          leftIcon={item}
          onEvent={() => {
            onChangeGroup(index);
          }}
          btnStyle={{
            ...styles.btnContainer,
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? '#a5a1ff' : 'transparent',
            backgroundColor: isSelected ? colors.black : 'transparent',
          }}
        />
      );
    },
    [currGroup],
  );

  return (
    <View style={{marginBottom: 6}}>
      <FlatList
        ref={ref}
        data={stickerGroup}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderStickerGroup}
        horizontal
        getItemLayout={(_, index) => ({
          length: iconSize,
          offset: iconSize * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: iconSize,
    height: iconSize,
    borderRadius: 8,
  },
});

export default forwardRef(StickerGroup);
