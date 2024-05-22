import {Keyboard, Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import VideoEditorHeader from '../VideoEditorHeader/VideoEditorHeader';
import VideoView from '../../../components/VideoView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontFamilyPicker from './FontFamilyPicker';
import ColorPickerCustom from '../../../components/ColorCustom';
import Animated, {
  FadeInDown,
  FadeOutDown,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ModeList from './ModeList';
import {textSize, videoHeight, width} from '../../../constants/other';
import {TextProps} from '../../../type';

interface TextPickerProps {
  isVisible: boolean;
  uri: string;
  textPicker: TextProps;
  vidName: string;
  onCancelTextEdit: () => void;
  onSaveTextEdit: (textObj: TextProps) => void;
}

const TextInputAnimate = Animated.createAnimatedComponent(TextInput);

const TextPicker = ({
  isVisible = false,
  uri,
  textPicker,
  vidName,
  onCancelTextEdit,
  onSaveTextEdit,
}: TextPickerProps) => {
  const {top, bottom} = useSafeAreaInsets();

  const inputRef = useRef(null);

  const [currMode, setCurrMode] = useState(1);
  const [isPause, setIsPause] = useState(false);
  const [input, setInput] = useState('');
  const [inputSize, setInputSize] = useState({w: 0, h: 0});
  const [keyboardH, setKeyboardH] = useState(bottom);
  const [fontPicker, setFontsPicker] = useState('Stick');

  const textEditor = useSharedValue(false);
  const textColor = useSharedValue('#ffffff');
  const bgTextColor = useSharedValue('');

  const handleLayoutInput = ({nativeEvent}: any) => {
    const {width, height} = nativeEvent.layout;

    setInputSize({w: width, h: height});
  };

  const stopResumeVid = () => {
    setIsPause(!isPause);
  };

  const handlePickMode = (mode: number) => {
    setCurrMode(mode);
  };

  const handleCancel = () => {
    onCancelTextEdit();
    clearState();
  };
  const handleTextInput = () => {
    const textObj: TextProps = {
      text: input,
      fontSize: textSize,
      fontFamily: fontPicker,
      color: textColor.value,
      bgColor: bgTextColor.value.length !== 0 ? bgTextColor.value : '#ffffff00',
      x: width / 2 - inputSize.w / 2,
      y: videoHeight / 2 - inputSize.h / 2,
      startTime: 0,
      endTime: 2,
      type: 'text',
    };

    onSaveTextEdit(textObj);
    clearState();
  };
  const handleTextSubmit = (state: boolean) => {
    textEditor.value = withTiming(state, {duration: 250});
  };

  const handleColorChange = (color: any) => {
    'worklet';
    currMode === 2 ? (textColor.value = color) : (bgTextColor.value = color);
  };

  const clearState = () => {
    setCurrMode(1);
    setIsPause(true);
    setInput('');
    setFontsPicker('Stick');
    textEditor.value = false;
    textColor.value = '#ffffff';
    bgTextColor.value = '';
  };

  const textInputStyle = useAnimatedStyle(() => ({
    color: textColor.value,
    backgroundColor: bgTextColor.value || 'transparent',
  }));

  const textEditorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      textEditor.value,
      [true, false],
      ['#00000080', '#00000000'],
    ),
  }));

  useEffect(() => {
    if (textPicker?.type === 'text') {
      setInput(textPicker?.text);
      setFontsPicker(textPicker?.fontFamily);
      textColor.value = textPicker?.color;
      bgTextColor.value = textPicker?.bgColor;
    }
  }, [textPicker]);

  useEffect(() => {
    inputRef.current?.focus();

    const showKBListener = Keyboard.addListener('keyboardWillShow', e => {
      const {height} = e.endCoordinates;
      setKeyboardH(height + 6);
    });

    const hideKBListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardH(bottom);
    });

    return () => {
      showKBListener.remove();
      hideKBListener.remove();
    };
  }, []);

  if (!isVisible) {
    return;
  }

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeOutDown}>
      <VideoView isPause={isPause} uri={uri} style={styles.videoStyle} />

      <Animated.View
        style={[
          styles.editContainer,
          {
            paddingBottom: keyboardH,
            paddingTop: top,
          },
          textEditorStyle,
        ]}>
        <VideoEditorHeader
          leftTextBtn="Cancel"
          vidName={vidName}
          rightTextBtn="Done"
          onLeftBtn={handleCancel}
          onRightBtn={handleTextInput}
        />

        <ModeList currMode={currMode} onSelectMode={handlePickMode} />

        <Pressable style={styles.textContaienr} onPress={stopResumeVid}>
          <TextInputAnimate
            autoFocus={true}
            value={input}
            onLayout={handleLayoutInput}
            onChangeText={setInput}
            onSubmitEditing={() => {
              handleTextSubmit(false);
            }}
            onFocus={() => {
              handleTextSubmit(true);
            }}
            style={[
              {...styles.textInputStyle, fontFamily: fontPicker},
              textInputStyle,
            ]}
          />
        </Pressable>

        <View>
          {currMode === 1 ? (
            <FontFamilyPicker
              currFont={fontPicker}
              onFontFamilyPicker={setFontsPicker}
            />
          ) : (
            <ColorPickerCustom
              currColor={currMode === 2 ? textColor.value : bgTextColor.value}
              onColorChange={handleColorChange}
            />
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },

  editContainer: {flex: 1},

  videoStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },

  textContaienr: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputStyle: {
    fontSize: textSize,
    color: 'white',
    minWidth: 40,
  },
});

export default TextPicker;
