import React, {useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Image, Pressable, StyleSheet} from 'react-native';
import {StickerProps, TextProps} from '../../../type';
import {stickerSize, videoHeight, width} from '../../../constants/other';
import TextCustom from '../../../components/TextCustom';

interface RenderOverideItemProps {
  item: TextProps | StickerProps;
  index: number;
  currTime: number;
  itemPicker: number;
  onCoordinateChange: (data: {x: number; y: number; idx: number}) => void;
  onStartDrag: () => void;
  onPickItem: (idx: number) => void;
}

const AnimatePressable = Animated.createAnimatedComponent(Pressable);

const RenderOverideItem = ({
  item,
  index,
  currTime,
  itemPicker,
  onCoordinateChange,
  onStartDrag,
  onPickItem,
}: RenderOverideItemProps) => {
  const {
    text,
    fontFamily,
    fontSize,
    color,
    bgColor,
    sticker,
    startTime,
    endTime,
    type,
  } = item;

  const isSticker = type === 'sticker';
  const isPicker = itemPicker === index;

  const [textDimension, setTextDimension] = useState({width: 0, height: 0});

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const getTextLayout = ({nativeEvent}: any) => {
    const {height, width} = nativeEvent.layout;

    setTextDimension({width, height});
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onBegin(() => {
      onStartDrag();
    })
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateX =
        width / 2 - (isSticker ? stickerSize : textDimension.width) / 2;
      const maxTranslateY =
        videoHeight / 2 - (isSticker ? stickerSize : textDimension.height) / 2;

      const xRange = prevTranslationX.value + event.translationX;
      const yRange = prevTranslationY.value + event.translationY;

      if (
        Math.abs(xRange) <= maxTranslateX &&
        Math.abs(yRange) <= maxTranslateY
      ) {
        translationX.value = xRange;
        translationY.value = yRange;
      }
    })
    .onEnd(event => {
      const {absoluteX, absoluteY} = event;

      onCoordinateChange({x: absoluteX - 16, y: absoluteY - 105, idx: index});
    })
    .runOnJS(true);

  if (startTime >= currTime || endTime <= currTime) {
    return;
  }

  return (
    <GestureDetector gesture={pan}>
      <AnimatePressable
        style={[
          animatedStyles,
          isSticker
            ? {
                ...styles.stickerContainer,
                borderWidth: isPicker ? 1 : 0,
                borderColor: isPicker ? 'white' : 'transparent',
              }
            : {
                position: 'absolute',
                left: -textDimension.width / 2,
                top: -textDimension.height / 2,
                borderWidth: isPicker ? 2 : 0,
                borderColor: isPicker ? 'white' : 'transparent',
              },
        ]}
        onPress={() => {
          onPickItem(index);
        }}>
        {isSticker ? (
          <Image source={sticker} style={styles.sticker} />
        ) : (
          <TextCustom
            text={text}
            fontSize={fontSize}
            fontFamily={fontFamily}
            color={color}
            style={{backgroundColor: bgColor || 'transparent'}}
            onLayout={getTextLayout}
          />
        )}
      </AnimatePressable>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  stickerContainer: {
    position: 'absolute',
    left: -stickerSize / 2,
    top: -stickerSize / 2,
    width: stickerSize,
    height: stickerSize,
  },

  sticker: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default RenderOverideItem;
