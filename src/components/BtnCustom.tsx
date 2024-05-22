import {Pressable, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';
import TextCustom from './TextCustom';
import {SvgProps} from 'react-native-svg';

interface BtnCustomProps {
  text?: string;
  textStyle?: TextStyle;
  leftIcon?: ReactElement<SvgProps>;
  isDisable?: boolean;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  extraComponent?: React.ReactNode;
  btnStyle?: ViewStyle;
  onEvent: () => void;
}

const BtnCustom = ({
  text,
  leftIcon,
  isDisable = false,
  fontFamily,
  fontSize,
  color,
  btnStyle,
  textStyle,
  extraComponent,
  onEvent,
}: BtnCustomProps) => {
  return (
    <Pressable
      disabled={isDisable}
      style={[styles.btnContainer, btnStyle]}
      onPress={onEvent}>
      {leftIcon}
      {text && (
        <TextCustom
          text={text}
          fontFamily={fontFamily}
          fontSize={fontSize}
          color={color}
          style={textStyle}
        />
      )}
      {extraComponent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default BtnCustom;
