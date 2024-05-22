import {Alert, Image, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import VideoEditorHeader from '../VideoEditorHeader/VideoEditorHeader';
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Pause} from '../../../constants/svg';
import BtnCustom from '../../../components/BtnCustom';
import TextCustom from '../../../components/TextCustom';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {base64Img} from '../../../constants/other';
import fonts from '../../../constants/fonts';
import colors from '../../../constants/colors';
import LoadingCustom from '../../../components/LoadingCustom';

type saveType = 'onlySave' | 'saveAndWatch';

interface VideoExportProps {
  isVisible: boolean;
  thumbnail: string;
  onBack: () => void;
  onSave: (t: string, s: saveType) => void;
}

const VideoExport = ({
  isVisible = false,
  thumbnail,
  onBack,
  onSave,
}: VideoExportProps) => {
  const {top} = useSafeAreaInsets();

  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value}],
  }));

  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoProcessing = async (state: saveType) => {
    setIsLoading(true);
    try {
      await onSave(output, state);
    } catch (error) {
      Alert.alert('Some errors has occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return;
  }

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={[animatedStyles, styles.container, {paddingTop: top}]}>
      <VideoEditorHeader
        leftTextBtn="Back"
        vidName="Export"
        onLeftBtn={onBack}
        style={{marginBottom: 6}}
      />

      <View style={styles.thumbnailContainer}>
        <Image source={{uri: base64Img + thumbnail}} style={styles.thumbnail} />

        <View style={styles.watchContainer}>
          <BtnCustom
            leftIcon={<Pause width={40} height={40} />}
            isDisable={output.length === 0}
            onEvent={() => {
              handleVideoProcessing('saveAndWatch');
            }}
          />
        </View>
      </View>

      <View style={styles.outputNameContainer}>
        <TextInput
          value={output}
          onChangeText={setOutput}
          autoFocus={true}
          style={styles.outputName}
          placeholder="Video name"
          placeholderTextColor={'#ffffff40'}
        />
        <TextCustom text={'.mp4'} color="white" fontSize={17} />
      </View>

      <BtnCustom
        text="Save"
        fontSize={17}
        isDisable={output.length === 0}
        btnStyle={{
          ...styles.saveBtn,
          backgroundColor: output.length > 2 ? 'white' : colors.gray,
        }}
        onEvent={() => {
          handleVideoProcessing('onlySave');
        }}
      />

      <LoadingCustom isVisiable={isLoading} text="Processing Video" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },

  thumbnailContainer: {
    width: '100%',
    height: '75%',
  },

  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  watchContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
  },

  outputNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '8%',
  },

  outputName: {
    color: 'white',
    fontSize: 17,
    fontFamily: fonts.bold,
  },

  saveBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: '15%',
  },
});

export default VideoExport;
