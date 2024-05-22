import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  AnimateStyle,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {timeline} from '../constants/other';
import {roundNumber} from '../util/calculate';

interface PanderItemCustomProps {
  initSize: number;
  initStartPosition: number;
  isDrag?: boolean;
  minLength: number;
  maxLength: number;
  isShowPander: boolean;
  onTimeChange: (x: number, y: number) => void;
  middleItem: React.ReactNode;
  leftPander: React.ReactNode;
  rightPander: React.ReactNode;
  containerStyle?: AnimateStyle<ViewStyle>;
  leftPanderContainer?: AnimateStyle<ViewStyle>;
  rightPanderContainer?: AnimateStyle<ViewStyle>;
}

const {timelineW} = timeline;

const PanderItemCustom = ({
  initSize,
  initStartPosition,
  isDrag = true,
  minLength,
  maxLength,
  isShowPander,
  onTimeChange,
  middleItem,
  leftPander,
  rightPander,
  containerStyle,
  leftPanderContainer,
  rightPanderContainer,
}: PanderItemCustomProps) => {
  const position = useSharedValue(initStartPosition);
  const w = useSharedValue(initSize);

  useEffect(() => {
    if (position.value !== initStartPosition || w.value !== initSize) {
      position.value = initStartPosition;
      w.value = initSize;
    }
  }, [initSize, initStartPosition]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position.value;
    },
    onActive: (event, ctx) => {
      const newPosition = ctx.startX + event.translationX;

      if (newPosition > 0 && newPosition + w.value <= maxLength) {
        position.value = ctx.startX + event.translationX;
      }
    },
    onFinish: () => {
      const startTime = roundNumber(position.value / timelineW, 1);
      const endTime = roundNumber((position.value + w.value) / timelineW, 1);

      onTimeChange(startTime, endTime);
    },
  });

  const leftHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startWidth = w.value;
      ctx.startPosition = position.value;
    },
    onActive: (event, ctx) => {
      const newWidth = ctx.startWidth - event.translationX;
      const newPosition = ctx.startPosition + event.translationX;

      if (newWidth > minLength && newPosition > 0) {
        position.value = newPosition;
        w.value = newWidth;
      }
    },
  });

  const rightHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startWidth = w.value;
      ctx.startPosition = position.value;
    },
    onActive: (event, ctx) => {
      const newWidth = ctx.startWidth + event.translationX;
      const newPosition = ctx.startPosition + event.translationX;

      if (newWidth + newPosition <= maxLength && newWidth > minLength) {
        w.value = newWidth;
      }
    },
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      width: w.value,
      transform: [
        {
          translateX: position.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={isDrag}>
      <Animated.View style={[styles.box, positionStyle, containerStyle]}>
        {isShowPander && (
          <PanGestureHandler onGestureEvent={leftHandler}>
            <Animated.View style={leftPanderContainer}>
              {leftPander}
            </Animated.View>
          </PanGestureHandler>
        )}

        {middleItem}

        {isShowPander && (
          <PanGestureHandler onGestureEvent={rightHandler}>
            <Animated.View style={rightPanderContainer}>
              {rightPander}
            </Animated.View>
          </PanGestureHandler>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PanderItemCustom;
