import React, {Fragment} from 'react';
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
import {RoverCard, WaitingForRovers, SomethingWentWrong} from '../components';

const {height} = Dimensions.get('window');

function HomeScreen({navigation}) {
  const {rovers, isError, isLoading} = useRoverList();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        style={styles.backgroundHeader}
        source={require('../assets/backdrop.png')}>
        {!isLoading && !isError ? (
          <Fragment>
            <Image style={styles.logo} source={LOGO} />
            <Text style={styles.header}>Rover to explore</Text>
          </Fragment>
        ) : null}
      </ImageBackground>
      {isLoading ? (
        <WaitingForRovers />
      ) : !isError ? (
        <View style={styles.cardContainer}>
          {rovers.map(rover => (
            <RoverCard
              {...rover}
              key={rover.id}
              onPress={() => navigation.navigate('Explore', {rover})}
            />
          ))}
        </View>
      ) : (
        <SomethingWentWrong retry="/rovers">
          <Text style={{color: 'white'}}>{isError.data?.error?.message}</Text>
        </SomethingWentWrong>
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
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#111',
  },
  logo: {
    width: 75,
    height: 75,
  },
});

export default HomeScreen;
