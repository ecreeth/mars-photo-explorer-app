import React from 'react';
import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
import RoverImage from './RoverImage';

const {width} = Dimensions.get('window');

const formatNumber = number =>
  String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,');

function RoverCard(props) {
  const {
    onPress,
    name,
    cameras,
    status,
    max_sol,
    total_photos,
    landing_date,
    launch_date,
  } = props;
  const isRoverActive = status === 'active';
  return (
    <Pressable
      delayLongPress={0}
      onPress={onPress}
      android_ripple={{color: '#dc2f02'}}
      style={styles.roverCard}>
      <RoverImage name={name} />
      <View style={styles.cardContainer}>
        <Text style={styles.roverName}>{name}</Text>
        <Text style={styles.paragraph}>
          Images:
          <Text style={styles.text}> {formatNumber(total_photos)}</Text>
        </Text>
        <Text style={styles.paragraph}>
          Martian Days:
          <Text style={styles.text}> {formatNumber(max_sol)}</Text>
        </Text>
        <Text style={styles.paragraph}>
          Launch Date:
          <Text style={styles.text}> {launch_date}</Text>
        </Text>
        <Text style={styles.paragraph}>
          Landing Date:
          <Text style={styles.text}> {landing_date}</Text>
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.paragraph}>{cameras.length} cameras</Text>
          <Text
            style={[
              styles.paragraph,
              styles.status,
              // eslint-disable-next-line react-native/no-inline-styles
              {color: isRoverActive ? '#0b3d91' : 'darkorange'},
            ]}>
            {isRoverActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  roverCard: {
    padding: 15,
    borderRadius: 4,
    marginBottom: 15,
    width: width * 0.93,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  text: {
    color: '#777',
  },
  paragraph: {
    color: '#333',
    paddingTop: 2.5,
  },
  roverName: {
    fontSize: 18,
    color: '#fc3d21',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  status: {
    color: '#333',
  },
});

export default RoverCard;
