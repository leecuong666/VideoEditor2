import {StyleSheet, View} from 'react-native';
import React from 'react';
import BtnCustom from '../../../components/BtnCustom';
import {Back, ThreeDots} from '../../../constants/svg';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {width} from '../../../constants/other';
import {createShadow} from '../../../style/shadow';

interface VideoEditedHeaderProps {
  hidenMoreAction: boolean;
  onBack: () => void;
  onEdit: () => void;
  onShare: () => void;
}

const VideoEditedHeader = ({
  hidenMoreAction = false,
  onBack,
  onEdit,
  onShare,
}: VideoEditedHeaderProps) => {
  const {top} = useSafeAreaInsets();
  const popup = useSharedValue(false);

  const togglePopup = () => {
    popup.value = withTiming(!popup.value, {duration: 200});
  };

  const popupStyle = useAnimatedStyle(() => ({
    opacity: interpolate(popup.value, [false, true], [0, 1]),
    pointerEvents: popup.value ? 'auto' : 'none',
  }));

  return (
    <View style={[styles.headerContainer, {top}]}>
      <BtnCustom
        leftIcon={<Back width={23} height={23} />}
        onEvent={onBack}
        btnStyle={styles.mainBtn}
      />
      {!hidenMoreAction && (
        <BtnCustom
          leftIcon={<ThreeDots />}
          extraComponent={
            <Animated.View style={[popupStyle, styles.popupContainer]}>
              <BtnCustom
                text="Edit"
                fontSize={15}
                onEvent={onEdit}
                btnStyle={styles.actionBtn}
              />
              <BtnCustom
                text="Share"
                fontSize={15}
                onEvent={onShare}
                btnStyle={styles.actionBtn}
              />
            </Animated.View>
          }
          onEvent={togglePopup}
          btnStyle={styles.mainBtn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  mainBtn: {
    padding: 6,
  },

  popupContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    right: '20%',
    top: '150%',
    width: width * 0.33,
    ...createShadow({offset: 2}),
  },

  actionBtn: {
    borderWidth: 1,
    width: '100%',
    paddingVertical: 6,
  },
});

export default VideoEditedHeader;
