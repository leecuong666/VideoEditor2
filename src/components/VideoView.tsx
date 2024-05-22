import {StyleSheet, ViewStyle} from 'react-native';
import React, {forwardRef} from 'react';
import Video from 'react-native-video';
import {videoHeight} from '../constants/other';

interface VideoViewProps {
  isPause: boolean;
  uri: string;
  style?: ViewStyle;
  onLoad?: (data: any) => void;
  onProgress?: (data: any) => void;
}

const VideoView = (
  {isPause, uri, style, onLoad, onProgress}: VideoViewProps,
  ref: any,
) => {
  return (
    <Video
      ref={ref}
      source={{uri}}
      paused={isPause}
      style={[styles.videoContainer, style]}
      muted={true}
      onLoad={onLoad}
      onProgress={onProgress}
      repeat={true}
      controls={false}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: videoHeight,
  },
});

export default forwardRef(VideoView);
