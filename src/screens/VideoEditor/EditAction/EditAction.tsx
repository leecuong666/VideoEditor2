import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../../constants/colors';
import {Back, Copy, Edit, Remove} from '../../../constants/svg';
import BtnCustom from '../../../components/BtnCustom';
import {itemType} from '../../../type';

interface EditActionProps {
  onBack: () => void;
  onEdit: () => void;
  onCopy: () => void;
  onRemove: () => void;
}

const EditAction = ({onBack, onEdit, onCopy, onRemove}: EditActionProps) => {
  return (
    <View style={styles.container}>
      <BtnCustom
        leftIcon={<Back />}
        btnStyle={styles.backBtn}
        onEvent={onBack}
      />

      <View style={styles.editContainer}>
        <BtnCustom
          leftIcon={<Edit />}
          text="Edit"
          color="white"
          btnStyle={styles.btnStyle}
          onEvent={onEdit}
        />
        <BtnCustom
          leftIcon={<Copy />}
          text="Copy"
          color="white"
          btnStyle={styles.btnStyle}
          onEvent={onCopy}
        />
        <BtnCustom
          leftIcon={<Remove />}
          text="Delete"
          color={colors.red}
          btnStyle={{...styles.btnStyle, backgroundColor: colors.red + '20'}}
          onEvent={onRemove}
        />
      </View>

      <View style={{width: '8%'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },

  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },

  btnStyle: {
    flexDirection: 'column',
    backgroundColor: colors.black,
    padding: 6,
    borderRadius: 3,
    marginLeft: 8,
    height: '85%',
    width: '30%',
  },

  backBtn: {
    backgroundColor: colors.black,
    height: '85%',
    width: '8%',
    paddingHorizontal: 6,
  },
});

export default EditAction;
