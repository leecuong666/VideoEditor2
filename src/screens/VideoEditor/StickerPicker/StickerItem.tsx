import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {width} from '../../../constants/other';
import {StickerProps} from '../../../type';

interface StickerItemProps {
  data: number[];
  stickerPicker: StickerProps | null;
  onStickerPicker: (n: number) => void;
}

const stickerSize = (width - 50) / 4;

const StickerItem = ({
  data,
  stickerPicker,
  onStickerPicker,
}: StickerItemProps) => {
  const renderSticker = ({item}: any) => {
    const isSelected = stickerPicker === item;

    return (
      <Pressable
        style={[
          styles.stickerContainer,
          {
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? '#a5a1ff' : 'transparent',
          },
        ]}
        onPress={() => {
          console.log(item);

          onStickerPicker(item);
        }}>
        <Image source={item} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.toString()}
        renderItem={renderSticker}
        numColumns={4}
        columnWrapperStyle={{marginBottom: 6}}
        getItemLayout={(_, index) => ({
          length: stickerSize,
          offset: stickerSize * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  stickerContainer: {
    width: stickerSize,
    height: stickerSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 6,
    marginRight: 6,
  },

  sticker: {
    width: stickerSize * 0.8,
    height: stickerSize * 0.8,
  },
});

export default memo(StickerItem);
