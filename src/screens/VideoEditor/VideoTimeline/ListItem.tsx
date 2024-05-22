import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {TextProps, StickerProps} from '../../../type';
import PanderItemCustom from '../../../components/PanderItemCustom';
import {LeftDrag, RightDrag, TextIcon} from '../../../constants/svg';
import colors from '../../../constants/colors';
import TextCustom from '../../../components/TextCustom';
import {timeline, width} from '../../../constants/other';

interface ListItemProps {
  data: (TextProps | StickerProps)[];
  itemPicker?: number;
  minWidthItem: number;
  maxWidthItem: number;
  onItemPicker: (i: number) => void;
  onItemSizeChange: (x: number, y: number) => void;
}

const iconSize = width * 0.06;
const estimateSize = iconSize + 26;
const {timelineW} = timeline;

const ListItem = ({
  data,
  itemPicker,
  minWidthItem,
  maxWidthItem,
  onItemPicker,
  onItemSizeChange,
}: ListItemProps) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: TextProps | StickerProps;
    index: number;
  }) => {
    const {text, fontFamily, color, sticker, type, startTime, endTime} = item;

    const isPicker = itemPicker === index;

    const initSize = (endTime - startTime) * timelineW;
    const initPosition = startTime * timelineW;

    return (
      <Pressable
        style={{flex: 1}}
        onPress={() => {
          onItemPicker(index);
        }}>
        <PanderItemCustom
          initSize={initSize}
          initStartPosition={initPosition}
          isDrag={isPicker}
          isShowPander={isPicker}
          minLength={minWidthItem}
          maxLength={maxWidthItem}
          onTimeChange={onItemSizeChange}
          leftPander={<LeftDrag />}
          rightPander={<RightDrag />}
          middleItem={
            <View
              style={{
                ...styles.middleContainer,
                borderColor: type === 'text' ? colors.yellow : colors.pink,
              }}>
              {type === 'sticker' ? (
                <>
                  <Image source={sticker} style={styles.sticker} />
                  <TextCustom text={'Sticker'} color="white" fontSize={16} />
                </>
              ) : (
                <>
                  <TextIcon width={iconSize} height={iconSize} />
                  <TextCustom
                    text={text}
                    color={color}
                    fontSize={16}
                    fontFamily={fontFamily}
                    lineNumber={1}
                    style={{marginLeft: 6, width: '70%'}}
                  />
                </>
              )}
            </View>
          }
          containerStyle={styles.panderContainer}
          leftPanderContainer={{
            ...styles.leftRightContainer,
            backgroundColor: type === 'text' ? colors.yellow : colors.pink,
          }}
          rightPanderContainer={{
            ...styles.leftRightContainer,
            backgroundColor: type === 'text' ? colors.yellow : colors.pink,
          }}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      getItemLayout={(_, index) => ({
        length: estimateSize,
        offset: estimateSize * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  panderContainer: {
    flex: 1,
    marginBottom: 3,
  },

  middleContainer: {
    flexGrow: 1,
    backgroundColor: colors.black,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderWidth: 1,
    paddingVertical: 12,
  },

  sticker: {
    width: iconSize,
    height: iconSize,
    marginRight: 6,
    resizeMode: 'contain',
  },

  leftRightContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
});

export default memo(ListItem);
