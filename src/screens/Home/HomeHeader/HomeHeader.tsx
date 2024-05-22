import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {CaroBg, MakeVideo, Smile} from '../../../constants/svg';
import {width, height} from '../../../constants/other';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../../constants/colors';
import TextCustom from '../../../components/TextCustom';
import fonts from '../../../constants/fonts';
import BtnCustom from '../../../components/BtnCustom';
import {createShadow} from '../../../style/shadow';
import images from '../../../constants/images';

interface HomeHeaderProps {
  onLibraryPicker: () => void;
  onFileSystemPicker: () => void;
}

const radius = 12;

const HomeHeader = ({onFileSystemPicker, onLibraryPicker}: HomeHeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <CaroBg width={width} height={width} style={styles.caroBg} />
      <View>
        <MakeVideo />

        <Image source={images.women} style={styles.womenImg} />
      </View>

      <View style={styles.importContainer}>
        <View style={styles.headerContainer}>
          <Smile width={width * 0.25} height={width * 0.25} />

          <View style={styles.colorContainer}>
            <View style={[styles.color, {backgroundColor: colors.pink}]} />
            <View style={[styles.color, {backgroundColor: colors.blue}]} />
            <View style={[styles.color, {backgroundColor: colors.purple}]} />
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <TextCustom
            text={'Import Video'}
            fontFamily={fonts.bold}
            fontSize={20}
          />

          <BtnCustom
            text={'Photo Library'}
            fontFamily={fonts.bold}
            btnStyle={styles.btnStyle}
            onEvent={onLibraryPicker}
          />

          <BtnCustom
            text={'File Picker'}
            fontFamily={fonts.bold}
            btnStyle={styles.btnStyle}
            onEvent={onFileSystemPicker}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  caroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  womenImg: {
    position: 'absolute',
    height: '100%',
    resizeMode: 'contain',
    left: '1%',
    top: '2%',
  },

  importContainer: {
    borderWidth: 1,
    borderRadius: radius,
    height: height * 0.3,
    width: '88%',
    marginTop: '6%',
    ...createShadow({offset: 5}),
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: '20%',
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    borderBottomWidth: 1,
    backgroundColor: colors.yellow,
  },

  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: '16%',
    marginRight: '4%',
  },

  color: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: 50,
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: colors.purple,
    borderBottomRightRadius: radius,
    borderBottomLeftRadius: radius,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  btnStyle: {
    backgroundColor: 'white',
    padding: 12,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    ...createShadow({color: '#000'}),
  },
});

export default HomeHeader;
