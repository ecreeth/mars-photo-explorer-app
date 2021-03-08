import React from 'react';
import {Image, StyleSheet} from 'react-native';

const URL = 'https://mars-photos.herokuapp.com/explore/images';

const ROBERT_NAME = {
  Curiosity: `${URL}/Curiosity_rover.jpg`,
  Spirit: `${URL}/Spirit_rover.jpg`,
  Opportunity: `${URL}/Opportunity_rover.jpg`,
  Perseverance:
    'https://www.techrepublic.com/a/hub/i/r/2020/07/16/17c3d680-eb3f-45c0-a0d6-aebfcf816133/thumbnail/770x578/6aa7318b94e944d91d45376388c22981/perseverance-rover.jpg',
};

const RoverImage = ({name}) => (
  <Image style={styles.roverImage} source={{uri: ROBERT_NAME[name]}} />
);

const styles = StyleSheet.create({
  roverImage: {
    width: 115,
    height: 140,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
});

export default RoverImage;
