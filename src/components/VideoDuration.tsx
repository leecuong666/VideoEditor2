import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo, useCallback} from 'react';
import colors from '../constants/colors';
import TextCustom from './TextCustom';
import {timeline} from '../constants/other';

interface VideoDurationProps {
  duration: number;
  style?: ViewStyle;
}

const {timelineW} = timeline;

const VideoDuration = ({duration, style}: VideoDurationProps) => {
  const durationArr = new Array(duration).fill(null);

  const renderDuration = useCallback(({_, index}: any) => {
    const isDisplay = index % 2 !== 0;

    return (
      <View style={styles.durationContainer}>
        {isDisplay ? (
          <TextCustom text={`${index}s`} color={colors.gray} fontSize={16} />
        ) : (
          <View style={styles.dot} />
        )}
      </View>
    );
  }, []);

  return (
    <View style={style}>
      <FlatList
        data={durationArr}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderDuration}
        horizontal
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: timelineW,
          offset: timelineW * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderTopWidth: 1, borderTopColor: colors.gray, paddingTop: 6},

  dot: {
    width: 6,
    height: 6,
    backgroundColor: colors.gray,
    borderRadius: 50,
  },

  durationContainer: {
    width: timelineW,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default memo(VideoDuration);
