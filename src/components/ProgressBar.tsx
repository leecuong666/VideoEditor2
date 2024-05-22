import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import images from '../constants/images';

interface SliderProps {
  currTime: number;
  duration: number;
  style?: ViewStyle;
  onSliceSeek: (t: number) => void;
}

const Progress = (props: SliderProps) => {
  const {currTime, duration, onSliceSeek, style} = props;

  const handleSliceChange = (time: number) => {
    onSliceSeek(time);
  };

  return (
    <View style={[styles.container, style]}>
      <Slider
        value={currTime}
        minimumValue={0}
        maximumValue={duration}
        step={0.1}
        onValueChange={handleSliceChange}
        maximumTrackTintColor={'#282727'}
        minimumTrackTintColor={'#ffffff'}
        thumbImage={images.thumb}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Progress;
