import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {LOGO} from '../utils';
import useRoverList from '../hooks/useRover';
import {RoverList, WaitingForRovers} from '../components';

const {height} = Dimensions.get('window');

function HomeScreen({navigation}) {
  const {rovers = [], isLoading} = useRoverList();

  return (
    <ScrollView contentContainerStyle={styles.growOne}>
      <ImageBackground
        style={styles.backgroundHeader}
        source={require('../assets/backdrop.png')}>
        {!isLoading ? (
          <>
            <Image style={styles.logo} source={LOGO} />
            <Text style={styles.header}>Rover to explore</Text>
          </>
        ) : null}
      </ImageBackground>
      {isLoading ? (
        <WaitingForRovers />
      ) : (
        <View style={styles.container}>
          <View style={styles.container}>
            <RoverList data={rovers} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 7,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  backgroundHeader: {
    height: height * 0.32,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growOne: {
    flexGrow: 1,
    backgroundColor: '#111',
  },
  logo: {
    width: 75,
    height: 75,
  },
});

export default HomeScreen;
