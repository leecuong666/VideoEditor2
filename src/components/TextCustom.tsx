import {Text, TextStyle} from 'react-native';
import React from 'react';
import fonts from '../constants/fonts';

interface TextCustomProps {
  text: string | number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  lineNumber?: number;
  style?: TextStyle;
  onLayout?: (data: any) => void;
}

const TextCustom = ({
  text,
  style,
  fontFamily = fonts.bold,
  fontSize,
  color,
  lineNumber,
  onLayout,
}: TextCustomProps) => {
  return (
    <Text
      numberOfLines={lineNumber}
      style={{fontSize, fontFamily, color, ...style}}
      onLayout={onLayout}>
      {text}
    </Text>
  );
};

export default TextCustom;
