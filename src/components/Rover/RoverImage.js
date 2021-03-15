import React from 'react';
import {Image, StyleSheet} from 'react-native';

const URL = 'https://mars-photos.herokuapp.com/explore/images';

const ROBERT_NAME = {
  Curiosity: `${URL}/Curiosity_rover.jpg`,
  Spirit: `${URL}/Spirit_rover.jpg`,
  Opportunity: `${URL}/Opportunity_rover.jpg`,
  Perseverance: `${URL}/Perseverance_rover.jpg`,
};

const RoverImage = ({name}) => (
  <Image style={styles.roverImage} source={{uri: ROBERT_NAME[name]}} />
);

const styles = StyleSheet.create({
  roverImage: {
    width: 125,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#eee',
  },
});

export default RoverImage;
