import RNFS from 'react-native-fs';
import {v4 as uuid} from 'uuid';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {getVideoDuration} from 'react-native-video-duration';
import {
  stickerSize,
  timeline,
  videoEditedPath,
  videoHeight,
  width,
} from '../constants/other';
import {StickerProps, TextProps} from '../type';
import {Image} from 'react-native';

const {framesPerSec} = timeline;
const resizeOutputName = 'img';
const overlayOutputName = 'overlay';
const textOutputName = 'vidtext';

const hexTo0x = (hex: string) => {
  return hex.replace('#', '0x');
};

const aspectRatioResize = (w: number, h: number) => {
  const isWGreaterH = w > h;

  const newW = isWGreaterH ? width : w / (h / videoHeight);
  const newH = isWGreaterH ? h / (w / width) : videoHeight;

  return {width: Math.floor(newW), height: Math.floor(newH)};
};

const defineMultiInput = (data: StickerProps[]) => {
  let multiInput = '';

  data.forEach(item => {
    multiInput += `-i ${Image.resolveAssetSource(item.sticker).uri} `;
  });

  return multiInput;
};

const resizeVideo = (rootDimension: {w: number; h: number}) => {
  const {w, h} = rootDimension;
  const {width, height} = aspectRatioResize(w, h);
  const resizeOutput = '[vidResize]';

  const resizeCmd = `[0:v]scale=${width}:${height}[vidscale]; [1:v][vidscale]overlay=(W-w)/2:(H-h)/2:shortest=1${resizeOutput};`;

  return {resizeCmd, resizeOutput};
};

const resizeMultiSticker = (data: StickerProps[]) => {
  let multiResize = '';

  for (let i = 0; i < data.length; i++) {
    const idx = i + 2;
    multiResize += `[${idx}:v]scale=${stickerSize}:-1[${resizeOutputName}${idx}];`;
  }

  return multiResize;
};

const overlayMultiSticker = (data: StickerProps[], outputBefore: string) => {
  let multiOverylay = '';
  let overlayOutput = '';

  for (let i = 0; i < data.length; i++) {
    const imgIdx = i + 2;
    const input1 =
      i === 0 ? outputBefore : `[${overlayOutputName}${imgIdx - 1}]`;
    const input2 = `[${resizeOutputName}${imgIdx}]`;
    overlayOutput = `[${overlayOutputName}${imgIdx}]`;

    const {x, y, startTime, endTime} = data[i];

    multiOverylay += `${input1}${input2}overlay=${x}:${y}:enable='between(t,${startTime},${endTime})'${overlayOutput};`;
  }

  return {multiOverylay, overlayOutput};
};

const drawTextFormat = (data: TextProps[], outputBefore: string) => {
  let multiTextFormat = '';
  let textFormatOutput = '';

  for (let i = 0; i < data.length; i++) {
    const {
      fontFamily,
      bgColor,
      color,
      fontSize,
      text,
      x,
      y,
      startTime,
      endTime,
    } = data[i];
    const input = i === 0 ? outputBefore : `[${textOutputName}${i - 1}]`;
    textFormatOutput = `[${textOutputName}${i}]`;

    multiTextFormat += `${input}drawtext=text='${text}':fontfile=${
      RNFS.MainBundlePath
    }/${fontFamily}.ttf:fontcolor=${hexTo0x(
      color,
    )}:fontsize=${fontSize}:box=1:boxcolor=${hexTo0x(
      bgColor,
    )}:x=${x}:y=${y}:enable='between(t,${startTime},${endTime})'${textFormatOutput};`;
  }

  return {multiTextFormat, textFormatOutput};
};

export const processItemIntoVideo = async (
  uri: string,
  data: any[],
  vidName: string,
  rootDimension: {w: number; h: number},
) => {
  const newVidName = `${vidName}.mp4`;
  const output = videoEditedPath + '/' + newVidName;
  const stickerData: StickerProps[] = data.filter(item => item.type !== 'text');
  const textData: TextProps[] = data.filter(item => item.type !== 'sticker');

  createFolder(videoEditedPath);

  const multiInput = defineMultiInput(stickerData);
  const multiResize = resizeMultiSticker(stickerData);
  const {resizeCmd, resizeOutput} = resizeVideo(rootDimension);
  const {overlayOutput, multiOverylay} = overlayMultiSticker(
    stickerData,
    resizeOutput,
  );
  const {textFormatOutput, multiTextFormat} = drawTextFormat(
    textData,
    stickerData.length === 0 ? resizeOutput : overlayOutput,
  );

  const cmd = `-i ${uri} -f lavfi -i color=black:s=${width}x${videoHeight} ${multiInput} -filter_complex "${resizeCmd}${multiResize}${multiOverylay}${multiTextFormat}" -map "${
    textFormatOutput || overlayOutput
  }" -c:a copy ${output}`;

  await FFmpegKit.execute(cmd);

  return newVidName;
};

export const generateVidId = () => {
  return uuid();
};

export const createFolder = async (path: string) => {
  const isExist = await RNFS.exists(path);

  if (!isExist) {
    await RNFS.mkdir(path);
  }
};

const generateBase64Img = async (path: string) => {
  const thumbnail = await RNFS.readFile('file://' + path, 'base64');
  await RNFS.unlink(path);

  return thumbnail;
};

export const generateThumbnail = async (uri: string) => {
  const mediaDestination = RNFS.CachesDirectoryPath + `/${generateVidId()}.jpg`;

  const cmd = `-i ${uri} -ss 00:00:02 -frames:v 1 ${mediaDestination}`;

  await FFmpegKit.execute(cmd);

  const base64Img = await generateBase64Img(mediaDestination);

  return base64Img;
};

export const copyVideoToFolder = async (
  videoPath: string,
  videoName: string,
  folderPath: string,
) => {
  await RNFS.copyFile(videoPath, folderPath + '/' + videoName);
};

export const durationExchange = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return {
    minutes: minutes > 9 ? minutes : `0${minutes}`,
    seconds: seconds > 9 ? seconds : `0${seconds}`,
  };
};

export const getDurationVid = async (uri: string) => {
  const result = await getVideoDuration(uri);

  return Math.floor(result);
};

export const getListBase64 = async (duration: number, output: string) => {
  let base64Arr = [];

  for (let i = 1; i <= duration; i++) {
    const uriIdx = output.replace('%4d', i.toString().padStart(4, '0'));

    const base64Img = await generateBase64Img(uriIdx);

    base64Arr.push(base64Img);
  }

  return base64Arr;
};

export const generateVideoTimeline = async (uri: string) => {
  const output = RNFS.TemporaryDirectoryPath + `${generateVidId()}_%4d.jpg`;
  const duration = await getDurationVid(uri);
  const allFrames = Math.floor(duration * framesPerSec);

  const cmd = `-i ${uri} -vf "fps=${framesPerSec}/1" -vframes ${allFrames} ${output}`;
  await FFmpegKit.execute(cmd);

  const base64Arr = await getListBase64(allFrames, output);

  return {base64Arr, duration};
};
