import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import TextCustom from '../../../components/TextCustom';
import BtnCustom from '../../../components/BtnCustom';
import colors from '../../../constants/colors';

interface VideoEditorHeaderProps {
  leftTextBtn: string;
  rightTextBtn?: string;
  vidName: string;
  onLeftBtn: () => void;
  onRightBtn?: () => void;
  hidenRightBtn?: boolean;
  disableRightBtn?: boolean;
  style?: ViewStyle;
}

const VideoEditorHeader = ({
  leftTextBtn,
  rightTextBtn,
  vidName,
  onLeftBtn,
  hidenRightBtn = false,
  disableRightBtn = false,
  onRightBtn,
  style,
}: VideoEditorHeaderProps) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <BtnCustom
        onEvent={onLeftBtn}
        text={leftTextBtn}
        color="white"
        fontSize={17}
        btnStyle={styles.btnContaier}
      />

      <TextCustom
        text={vidName}
        color="white"
        fontSize={17}
        lineNumber={1}
        style={{width: '40%', textAlign: 'center'}}
      />

      {hidenRightBtn ? (
        <View style={styles.btnContaier} />
      ) : (
        <BtnCustom
          onEvent={onRightBtn}
          text={rightTextBtn}
          color={disableRightBtn ? colors.gray : colors.yellow}
          fontSize={17}
          isDisable={disableRightBtn}
          btnStyle={styles.btnContaier}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingHorizontal: 12,
  },

  btnContaier: {
    width: '16%',
  },
});

export default VideoEditorHeader;
