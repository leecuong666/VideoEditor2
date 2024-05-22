import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import ColorPickerCustom from '../../../components/ColorCustom';

interface BgColorPickerProps {
  onTextBgColorPicker: (c: string) => void;
}

const BgColorPicker = ({onTextBgColorPicker}: BgColorPickerProps) => {
  const textColor = useSharedValue('#ffffff');

  const handlePickTextColor = (color: any) => {
    'worklet';

    const {hex} = color;

    textColor.value = hex;
    onTextBgColorPicker(hex);
  };

  return <ColorPickerCustom onColorChange={handlePickTextColor} />;
};

export default BgColorPicker;
