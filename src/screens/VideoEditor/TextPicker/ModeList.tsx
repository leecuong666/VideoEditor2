import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Color, List, TextIcon, TextIcon2} from '../../../constants/svg';
import BtnCustom from '../../../components/BtnCustom';
import {width} from '../../../constants/other';

interface ModeListProps {
  currMode: number;
  onSelectMode: (n: number) => void;
}

const iconSize = width * 0.07;

const ModeList = ({currMode, onSelectMode}: ModeListProps) => {
  return (
    <View style={styles.container}>
      <List width={iconSize} height={iconSize} />
      {currMode !== 1 && (
        <BtnCustom
          leftIcon={<TextIcon width={iconSize} height={iconSize} />}
          onEvent={() => {
            onSelectMode(1);
          }}
        />
      )}
      {currMode !== 2 && (
        <BtnCustom
          leftIcon={<Color width={iconSize} height={iconSize} />}
          onEvent={() => {
            onSelectMode(2);
          }}
        />
      )}
      {currMode !== 3 && (
        <BtnCustom
          leftIcon={<TextIcon2 width={iconSize} height={iconSize} />}
          onEvent={() => {
            onSelectMode(3);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default ModeList;
