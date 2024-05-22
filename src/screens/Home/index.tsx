import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import HomeHeader from './HomeHeader/HomeHeader';
import {
  copyVideoToFolder,
  createFolder,
  generateThumbnail,
  generateVidId,
  generateVideoTimeline,
} from '../../util/video';
import {videoStoragePath} from '../../constants/other';
import ImagePicker from 'react-native-image-crop-picker';
import {useRealm} from '@realm/react';
import {MediaProps} from '../../type';
import {MediaPicker} from '../../database/models';
import {pick, types} from 'react-native-document-picker';
import MyList from './MyList/MyList';

const Home = ({navigation}: any) => {
  const realm = useRealm();

  useEffect(() => {
    createFolder(videoStoragePath);
  }, []);

  const createMediaPicker = (data: MediaProps[]) => {
    realm.write(() => {
      data.forEach(item => {
        realm.create(MediaPicker, item);
      });
    });
  };

  const handleLibraryPicker = async () => {
    const data = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'video',
    });

    let allVid: MediaProps[] = [];

    for (let item of data) {
      const {path, filename} = item;

      const name = filename || `${generateVidId()}.mp4`;

      await copyVideoToFolder(path, name, videoStoragePath);
      const thumbnail = await generateThumbnail(path);
      const {duration, base64Arr} = await generateVideoTimeline(path);

      allVid.push({
        id: generateVidId(),
        name: name,
        thumbnail,
        timelineData: base64Arr,
        duration,
      });
    }

    createMediaPicker(allVid);
  };

  const handleFilePicker = async () => {
    const data = await pick({
      allowMultiSelection: true,
      type: [types.video],
    });

    const allVid: MediaProps[] = [];
    for (let item of data) {
      const {uri, name} = item;

      const fileName = name || `${generateVidId()}.mp4`;

      await copyVideoToFolder(uri, fileName, videoStoragePath);

      const thumbnail = await generateThumbnail(uri);
      const {duration, base64Arr} = await generateVideoTimeline(uri);

      allVid.push({
        id: generateVidId(),
        name: fileName,
        thumbnail,
        timelineData: base64Arr,
        duration,
      });
    }

    createMediaPicker(allVid);
  };

  const handlePressVideo = (screen: string, obj: MediaProps) => {
    navigation.navigate(screen, obj);
  };

  return (
    <ScrollView
      alwaysBounceVertical={false}
      bounces={false}
      style={styles.container}>
      <HomeHeader
        onFileSystemPicker={handleFilePicker}
        onLibraryPicker={handleLibraryPicker}
      />

      <MyList onVideoPress={handlePressVideo} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
