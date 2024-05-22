import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');
const videoStoragePath = RNFS.DocumentDirectoryPath + '/videoStorage';
const videoEditedPath = RNFS.DocumentDirectoryPath + '/videoEdited';
const base64Img = 'data:image/jpeg;base64,';
const timeline = {
  timelineW: width * 0.15,
  framesPerSec: 2,
};
const textSize = width * 0.05;
const stickerSize = width * 0.1;
const videoHeight = height / 2;

export {
  width,
  height,
  videoStoragePath,
  videoEditedPath,
  base64Img,
  timeline,
  textSize,
  stickerSize,
  videoHeight,
};
