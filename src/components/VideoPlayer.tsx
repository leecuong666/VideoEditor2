import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {forwardRef, useState} from 'react';
import Control from './Control';
import VideoView from './VideoView';
import ProgressBar from './ProgressBar';

interface VideoPlayerProps {
  isPause: boolean;
  uri: string;
  hidenProgessBar: boolean;
  getRootSize?: (data: {width: number; height: number}) => void;
  onStopResume: () => void;
  overrideVideoComponent?: () => React.ReactNode;
  videoStyle?: ViewStyle;
  sliderStyle?: ViewStyle;
  controlStyle?: ViewStyle;
}

const VideoPlayer = (
  {
    isPause,
    uri,
    hidenProgessBar = true,
    onStopResume,
    getRootSize,
    overrideVideoComponent,
    videoStyle,
    sliderStyle,
    controlStyle,
  }: VideoPlayerProps,
  ref: any,
) => {
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleLoadVideo = (data: any) => {
    getRootSize && getRootSize(data.naturalSize);
    setDuration(data.duration);
  };

  const handleSeekTime = (time: number) => {
    ref.current?.seek(currTime + time);
  };

  const handleProgress = (data: any) => {
    setCurrTime(data.currentTime);
  };

  const handleSlider = (time: number) => {
    ref.current?.seek(time);
  };

  return (
    <View>
      <View>
        <VideoView
          ref={ref}
          isPause={isPause}
          uri={uri}
          onLoad={handleLoadVideo}
          onProgress={handleProgress}
          style={videoStyle}
        />

        <View style={StyleSheet.absoluteFillObject}>
          {overrideVideoComponent && overrideVideoComponent({currTime})}
        </View>
      </View>

      {!hidenProgessBar && (
        <ProgressBar
          currTime={currTime}
          duration={duration}
          onSliceSeek={handleSlider}
          style={sliderStyle}
        />
      )}

      <Control
        isPause={isPause}
        currTime={currTime}
        duration={duration}
        onSeekTime={handleSeekTime}
        onStopResume={onStopResume}
        style={controlStyle}
      />
    </View>
  );
};

export default forwardRef(VideoPlayer);
