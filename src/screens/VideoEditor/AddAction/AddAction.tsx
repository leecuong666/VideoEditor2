import {StyleSheet, View} from 'react-native';
import React from 'react';
import BtnCustom from '../../../components/BtnCustom';
import {StickerIconNoBD, TextIconNoBD} from '../../../constants/svg';
import colors from '../../../constants/colors';
import {height} from '../../../constants/other';

interface AddActionProps {
  onAddText: () => void;
  onAddSticker: () => void;
}

const AddAction = ({onAddText, onAddSticker}: AddActionProps) => {
  return (
    <View style={styles.container}>
      <BtnCustom
        leftIcon={<TextIconNoBD />}
        text="Add Text"
        color="white"
        btnStyle={styles.btnStyle}
        onEvent={onAddText}
      />
      <BtnCustom
        leftIcon={<StickerIconNoBD />}
        text="Add Sticker"
        color="white"
        btnStyle={styles.btnStyle}
        onEvent={onAddSticker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  btnStyle: {
    flexDirection: 'column',
    backgroundColor: colors.black,
    padding: 6,
    borderRadius: 3,
    marginLeft: 8,
    height: '85%',
    width: '28%',
  },
});

export default AddAction;
