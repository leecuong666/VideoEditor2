import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import ColorPickerCustom from '../../../components/ColorCustom';

interface TextColorPickerProps {
  onTextColorPicker: (c: string) => void;
}

const TextColorPicker = ({onTextColorPicker}: TextColorPickerProps) => {
  const textColor = useSharedValue('#ffffff');

  const handlePickTextColor = (color: any) => {
    'worklet';

    const {hex} = color;

    textColor.value = hex;
    onTextColorPicker(textColor.value);
  };

  return <ColorPickerCustom onColorChange={handlePickTextColor} />;
};

export default TextColorPicker;
