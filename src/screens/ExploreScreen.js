import React, {memo, useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ImageView from 'react-native-image-viewing';
import fetcher from '../utils/fetcher';

const {height} = Dimensions.get('window');

function ExploreScreen({navigation, route}) {
  const {rover} = route.params;
  const [sol, setSol] = useState(0);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    if (!hasMoreData || sol > rover.max_sol) {
      return;
    }
    setLoading(true);
    fetcher(`/rovers/${rover.name}/photos?sol=${sol}&page=${page}`)
      .then(res => {
        //
        if (!res?.photos.length) {
          setSol(sol + 1);
          setHasMoreData(false);
          return;
        }
        //
        const filteredData = res.photos.map(photo => ({
          ...photo,
          uri: photo.img_src,
        }));

        setPhotos(prev =>
          page === 1 ? filteredData : [...prev, ...filteredData],
        );
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [hasMoreData, page, rover.max_sol, rover.name, sol]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Explore ${rover.name}`,
    });
  }, [navigation, rover.name]);

  const onEndReached = () => {
    if (isLoading) {
      return;
    }
    setPage(page + 1);
  };

  const ListItem = memo(({item, index}) => {
    return (
      <View style={styles.imageContainer}>
        <Pressable
          key={item.id}
          onPress={() => {
            setCurrentImage(index);
            setModalVisibility(true);
          }}>
          <Image
            style={styles.image}
            source={{uri: item.uri}}
            progressiveRenderingEnabled
          />
          <View style={styles.imageContent}>
            <Text>🌞 {item.sol}</Text>
            <Text>📸 {item.earth_date}</Text>
          </View>
        </Pressable>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCamera}
        onValueChange={item => setSelectedCamera(item)}>
        <Picker.Item value="any" label="All Rover Cameras" />
        {rover.cameras.map(camera => (
          <Picker.Item
            key={camera.id}
            value={camera.name}
            label={camera.full_name}
          />
        ))}
      </Picker>

      <FlatList
        data={photos}
        initialNumToRender={26}
        maxToRenderPerBatch={40}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={props => <ListItem {...props} />}
        ListFooterComponent={() =>
          isLoading ? (
            <ActivityIndicator style={styles.footer} color="#333" />
          ) : null
        }
      />

      <ImageView
        images={photos}
        animationType="slide"
        visible={isModalVisible}
        imageIndex={currentImage}
        onRequestClose={() => setModalVisibility(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
    backgroundColor: '#f8edeb',
  },
  footer: {
    marginVertical: 10,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 7,
    height: height * 0.25,
    backgroundColor: '#ddd',
  },
  imageContent: {
    paddingTop: 4,
    marginBottom: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    margin: 1,
    flexDirection: 'column',
  },
});

export default ExploreScreen;
