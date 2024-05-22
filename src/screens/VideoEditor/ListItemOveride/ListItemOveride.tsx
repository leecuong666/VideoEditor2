import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {StickerProps, TextProps} from '../../../type';
import RenderOverideItem from './RenderOverideItem';
import {stickerSize} from '../../../constants/other';

interface ListItemOverideProps {
  data: (StickerProps | TextProps)[];
  itemPicker: number;
  currTime: number;
  onUpdateCoordinate: (data: {x: number; y: number; idx: number}) => void;
  onStartDrag: () => void;
  onPickItem: (idx: number) => void;
}

const estimateSize = stickerSize;

const ListItemOveride = ({
  data,
  currTime,
  itemPicker,
  onUpdateCoordinate,
  onStartDrag,
  onPickItem,
}: ListItemOverideProps) => {
  const renderItem = ({item, index}: any) => {
    return (
      <RenderOverideItem
        item={item}
        index={index}
        currTime={currTime}
        itemPicker={itemPicker}
        onCoordinateChange={onUpdateCoordinate}
        onStartDrag={onStartDrag}
        onPickItem={onPickItem}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
      initialNumToRender={66}
      getItemLayout={(_, index) => ({
        length: estimateSize,
        offset: estimateSize * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListItemOveride;
