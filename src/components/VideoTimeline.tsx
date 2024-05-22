import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {base64Img, timeline} from '../constants/other';

interface VideoTimelineProps {
  timelineData: string[];
  containerStyle?: ViewStyle;
}

const {timelineW, framesPerSec} = timeline;
const imgW = timelineW / framesPerSec;
const imgH = (imgW * 4) / 3;

const VideoTimeline = ({timelineData, containerStyle}: VideoTimelineProps) => {
  const renderTimeline = useCallback(({item}: {item: string}) => {
    return <Image source={{uri: base64Img + item}} style={styles.img} />;
  }, []);

  return (
    <View style={containerStyle}>
      <FlatList
        data={timelineData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderTimeline}
        horizontal
        scrollEnabled={false}
        getItemLayout={(_, index) => ({
          length: imgW,
          offset: imgW * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: imgW,
    height: imgH,
  },
});

export default memo(VideoTimeline);
