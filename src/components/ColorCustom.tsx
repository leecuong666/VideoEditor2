import {StyleSheet} from 'react-native';
import React from 'react';
import ColorPicker, {Panel3} from 'reanimated-color-picker';
import {width} from '../constants/other';

interface ColorPickerCustomProps {
  currColor?: string;
  onColorChange: (c: string) => void;
}

const colorSize = width * 0.4;
const thumbSize = width * 0.06;

const ColorPickerCustom = ({
  currColor,
  onColorChange,
}: ColorPickerCustomProps) => {
  const handleColorChange = ({hex}: any) => {
    'worklet';

    onColorChange(hex);
  };

  return (
    <ColorPicker
      value={currColor || '#ffffff'}
      style={styles.colorStyle}
      onChange={handleColorChange}>
      <Panel3 centerChannel="saturation" thumbSize={thumbSize} />
    </ColorPicker>
  );
};

const styles = StyleSheet.create({
  colorStyle: {
    borderWidth: 2,
    borderColor: 'white',
    width: colorSize,
    height: colorSize,
    borderRadius: colorSize / 2,
    alignSelf: 'center',
  },
});

export default ColorPickerCustom;
