import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import TextCustom from './TextCustom';
import colors from '../constants/colors';

interface LoadingCustomProps {
  isVisiable: boolean;
  text: string;
}

const LoadingCustom = ({isVisiable, text = ''}: LoadingCustomProps) => {
  if (!isVisiable) {
    return;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.yellow} />
      <TextCustom
        text={text}
        color={'white'}
        fontSize={17}
        style={{marginTop: 6}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000050',
  },
});

export default LoadingCustom;
