import {Share, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {MediaProps} from '../../type';
import VideoEditedHeader from './VideoEditedHeader/VideoEditedHeader';
import VideoPlayer from '../../components/VideoPlayer';
import {height, videoEditedPath} from '../../constants/other';

interface VideoEditedProps {
  navigation: any;
  route: {params: {item: MediaProps; navigationType: 'preview' | 'edited'}};
}

const VideoEdited = ({navigation, route}: VideoEditedProps) => {
  const {item, navigationType} = route.params;
  const {name} = item;
  const uri = videoEditedPath + '/' + name;

  const vidRef = useRef(null);

  const [isPause, setIsPause] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const stopResumeVideo = () => {
    setIsPause(!isPause);
  };

  const handleEdit = () => {
    navigation.navigate('VideoEditor', item);
  };

  const handleShare = async () => {
    await Share.share({
      title: 'Share your video!',
      url: uri,
    });
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        ref={vidRef}
        isPause={isPause}
        uri={uri}
        hidenProgessBar={false}
        onStopResume={stopResumeVideo}
        overrideVideoComponent={() => (
          <VideoEditedHeader
            hidenMoreAction={navigationType === 'preview'}
            onBack={handleBack}
            onEdit={handleEdit}
            onShare={handleShare}
          />
        )}
        videoStyle={styles.video}
        sliderStyle={styles.control}
        controlStyle={styles.control}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  video: {
    height: height * 0.85,
  },

  control: {
    paddingHorizontal: 12,
  },
});

export default VideoEdited;
