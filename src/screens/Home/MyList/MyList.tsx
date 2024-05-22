import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useQuery} from '@realm/react';
import {MediaEdited, MediaPicker} from '../../../database/models';
import {MediaProps} from '../../../type';
import {base64Img, height} from '../../../constants/other';
import TextCustom from '../../../components/TextCustom';
import fonts from '../../../constants/fonts';
import colors from '../../../constants/colors';
import BtnCustom from '../../../components/BtnCustom';

interface MyListProps {
  onVideoPress: (s: string, i: MediaProps) => void;
}

const MyList = ({onVideoPress}: MyListProps) => {
  const videoStorage = useQuery(MediaPicker);
  const videoEdited = useQuery(MediaEdited);

  const [isVidStorage, setIsVidStorage] = useState(true);

  const renderMyVideos = ({item}: {item: MediaProps}) => {
    const {name, thumbnail} = item;

    return (
      <Pressable
        style={styles.imgContainer}
        onPress={() => {
          onVideoPress(
            isVidStorage ? 'VideoEditor' : 'VideoEdited',
            isVidStorage ? item : {item, navigationType: 'edited'},
          );
        }}>
        <View style={styles.nameContainer}>
          <TextCustom
            lineNumber={1}
            text={name}
            fontFamily={fonts.medium}
            style={{width: '66%'}}
          />
        </View>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{uri: base64Img + thumbnail}}
            style={styles.myVidImg}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View
            style={[
              styles.itemBottom,
              {
                width: '40%',
                borderBottomLeftRadius: 12,
                borderRightWidth: 0,
                backgroundColor: colors.yellow,
              },
            ]}
          />
          <View
            style={[
              styles.itemBottom,
              {width: '60%', borderBottomRightRadius: 12},
            ]}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={isVidStorage ? videoStorage : videoEdited}
      keyExtractor={(item: MediaProps) => item.id}
      renderItem={renderMyVideos}
      scrollEnabled={false}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between', marginBottom: '4%'}}
      ListHeaderComponent={() => (
        <View style={styles.myVidContainer}>
          <BtnCustom
            onEvent={() => {
              setIsVidStorage(true);
            }}
            text={'Video import'}
            btnStyle={styles.myVidText}
            textStyle={{
              textDecorationLine: isVidStorage ? 'underline' : 'none',
            }}
            fontSize={22}
            fontFamily={fonts.bold}
          />
          <BtnCustom
            onEvent={() => {
              setIsVidStorage(false);
            }}
            text={'My videos'}
            btnStyle={styles.myVidText}
            textStyle={{
              textDecorationLine: isVidStorage ? 'none' : 'underline',
            }}
            fontSize={22}
            fontFamily={fonts.bold}
          />
        </View>
      )}
      ListEmptyComponent={() => (
        <TextCustom
          text={'Video is not found'}
          color={colors.purple}
          fontSize={18}
          style={styles.textEmpty}
        />
      )}
      contentContainerStyle={{paddingHorizontal: '4%'}}
    />
  );
};

const styles = StyleSheet.create({
  myVidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: '6%',
  },

  imgContainer: {
    width: '48%',
  },

  nameContainer: {
    backgroundColor: colors.yellow,
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
  },

  myVidText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },

  thumbnailContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  myVidImg: {
    width: '100%',
    height: height * 0.2,
  },

  bottomContainer: {
    height: 12,
    flexDirection: 'row',
  },

  itemBottom: {
    borderWidth: 1,
    height: '100%',
  },

  textEmpty: {
    textAlign: 'center',
  },
});

export default MyList;
