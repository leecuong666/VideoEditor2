import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {fontsList} from '../../../constants/list';
import BtnCustom from '../../../components/BtnCustom';
import {width} from '../../../constants/other';

interface FontFamilyPickerProps {
  currFont: string;
  onFontFamilyPicker: (f: string) => void;
}

const iconSize = width * 0.1;

const FontFamilyPicker = ({
  currFont,
  onFontFamilyPicker,
}: FontFamilyPickerProps) => {
  const renderFonts = ({item}: any) => {
    const isPicker = currFont === item;

    return (
      <BtnCustom
        text="Aa"
        color={isPicker ? '#a5a1ff' : '#ffffff'}
        fontSize={18}
        fontFamily={item}
        btnStyle={{
          ...styles.fontBtn,
          backgroundColor: isPicker ? '#ffffff' : '#00000050',
        }}
        onEvent={() => {
          onFontFamilyPicker(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={fontsList}
        keyExtractor={item => item}
        renderItem={renderFonts}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
  },

  fontBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: iconSize,
    height: iconSize,
    borderRadius: 3,
    marginRight: width * 0.035,
  },
});

export default FontFamilyPicker;
