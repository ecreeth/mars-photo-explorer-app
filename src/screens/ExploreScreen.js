import React, {memo, useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
import fetcher from '../utils/fetcher';

const {height} = Dimensions.get('window');

function ExploreScreen({navigation, route}) {
  const {rover} = route.params;
  const [sol, setSol] = useState(0);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoadingPhotos, setLoadingPhotos] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    if (sol > rover.max_sol) {
      return;
    }
    setLoadingPhotos(true);
    fetcher(`/rovers/${rover.name}/photos?sol=${sol}&page=${page}`)
      .then(res => {
        // Check if there not photos in the current sol
        if (!res.photos.length && sol < rover.max_sol) {
          setSol(sol + 1);
          return;
        }

        // Let's format the incoming data
        const filteredData = res.photos.map(photo => ({
          ...photo,
          uri: photo.img_src,
        }));

        setPhotos(prev =>
          page === 1 ? filteredData : [...prev, ...filteredData],
        );
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setLoadingPhotos(false);
      });
  }, [page, rover.max_sol, rover.name, sol]);

  // Change the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Explore ${rover.name}`,
    });
  }, [navigation, rover.name]);

  const onEndReached = () => {
    if (isLoadingPhotos) {
      return;
    }
    setPage(page + 1);
  };

  // A very simple skeleton
  const Skeleton = () => (
    <View style={styles.mb12}>
      <View style={[styles.image, {justifyContent: 'center'}]}>
        <ActivityIndicator color="#333" />
      </View>
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonLeft} />
        <View style={styles.skeletonRigth} />
      </View>
    </View>
  );

  if (isLoadingPhotos && !photos.length) {
    return (
      <View style={styles.container}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </View>
    );
  }

  const ListItem = memo(({item, index}) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => {
          setCurrentImage(index);
          setModalVisibility(true);
        }}>
        <FastImage style={styles.image} source={{uri: item.uri}} />
        <View style={styles.imageContent}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginRight: 10}}>🌞 {item.sol}</Text>
            <Text>📷 {item.camera.name}</Text>
          </View>
          <Text>📅 {item.earth_date}</Text>
        </View>
      </Pressable>
    );
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        removeClippedSubviews
        initialNumToRender={26}
        maxToRenderPerBatch={40}
        onEndReached={onEndReached}
        updateCellsBatchingPeriod={60}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={props => <ListItem {...props} />}
        ListFooterComponent={() =>
          isLoadingPhotos ? (
            <ActivityIndicator style={styles.footer} color="#333" />
          ) : null
        }
      />

      <ImageView
        images={photos}
        animationType="slide"
        visible={isModalVisible}
        imageIndex={currentImage}
        swipeToCloseEnabled={false}
        onRequestClose={() => setModalVisibility(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f8edeb',
  },
  footer: {
    marginVertical: 10,
  },
  mb12: {
    marginBottom: 12,
  },
  image: {
    width: '100%',
    borderRadius: 7,
    height: height * 0.25,
    backgroundColor: '#ddd',
  },
  imageContent: {
    paddingTop: 4,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  skeletonLeft: {
    width: 50,
    height: 15,
    backgroundColor: '#ccc',
  },
  skeletonRigth: {
    width: 100,
    height: 15,
    backgroundColor: '#ccc',
  },
});

export default ExploreScreen;
