import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import TextCustom from './TextCustom';
import {Next, Pause, Resume, Rewind} from '../constants/svg';
import BtnCustom from './BtnCustom';
import fonts from '../constants/fonts';
import {durationExchange} from '../util/video';

interface ControlProps {
  isPause: boolean;
  currTime: number;
  duration: number;
  onSeekTime: (time: number) => void;
  onStopResume: () => void;
  style?: ViewStyle;
}

const Control = ({
  isPause,
  currTime,
  duration,
  onSeekTime,
  onStopResume,
  style,
}: ControlProps) => {
  const vidCurr = durationExchange(currTime);
  const vidDuration = durationExchange(duration);

  return (
    <View style={[styles.controlContainer, style]}>
      <TextCustom
        text={`${vidCurr?.minutes}:${vidCurr?.seconds}`}
        color="white"
        fontFamily={fonts.regular}
        style={styles.textCustomStyle}
      />

      <View style={styles.controlCenter}>
        <BtnCustom
          leftIcon={<Rewind />}
          onEvent={() => {
            onSeekTime(-10);
          }}
        />
        <BtnCustom
          onEvent={onStopResume}
          leftIcon={isPause ? <Pause /> : <Resume />}
        />
        <BtnCustom
          leftIcon={<Next />}
          onEvent={() => {
            onSeekTime(10);
          }}
        />
      </View>

      <TextCustom
        text={`${vidDuration?.minutes}:${vidDuration?.seconds}`}
        color="white"
        fontFamily={fonts.regular}
        style={{...styles.textCustomStyle, textAlign: 'right'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  controlCenter: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  textCustomStyle: {
    width: '20%',
  },
});

export default Control;
