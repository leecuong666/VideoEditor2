import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import TextCustom from './TextCustom';
import {Close, Smile} from '../constants/svg';
import BtnCustom from './BtnCustom';
import colors from '../constants/colors';
import {createShadow} from '../style/shadow';

interface ModalCustomProps {
  isVisiable: boolean;
  mainText: string;
  leftBtnText: string;
  rightBtnText: string;
  onClose: () => void;
  onLeftBtn: () => void;
  onRightBtn: () => void;
}

const ModalCustom = ({
  isVisiable = false,
  mainText,
  leftBtnText,
  rightBtnText,
  onClose,
  onLeftBtn,
  onRightBtn,
}: ModalCustomProps) => {
  return (
    <Modal isVisible={isVisiable} style={styles.container}>
      <View style={styles.headerContainer}>
        <Smile width={45} height={45} />

        <BtnCustom
          leftIcon={<Close />}
          onEvent={onClose}
          btnStyle={styles.closeBtn}
        />
      </View>

      <View style={styles.bodyContainer}>
        <TextCustom text={mainText} fontSize={19} style={styles.mainText} />

        <View style={styles.btnContainer}>
          <BtnCustom
            text={leftBtnText}
            onEvent={onLeftBtn}
            btnStyle={{...styles.btnStyle, backgroundColor: colors.pink2}}
          />
          <BtnCustom
            text={rightBtnText}
            onEvent={onRightBtn}
            btnStyle={{...styles.btnStyle, backgroundColor: colors.purple2}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...createShadow({offset: 6, color: '#aa9fbb'}),
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.yellow,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
  },

  closeBtn: {
    ...createShadow({offset: 2}),
  },

  bodyContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: '7%',
  },

  mainText: {
    textAlign: 'center',
    width: '70%',
    marginBottom: '7%',
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '96%',
  },

  btnStyle: {
    width: '44%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: '3%',
    ...createShadow({offset: 3}),
  },
});

export default ModalCustom;
