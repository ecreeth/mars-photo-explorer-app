import React from 'react';
import {mutate} from 'swr';
import {Pressable, StyleSheet, Text, View} from 'react-native';

function SomethingWentWrong() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😞</Text>
      <Text style={styles.title}>¡Oops, something went wrong!</Text>
      <Text style={{color: 'white'}}>
        Please, check your internet connection
      </Text>
      <Pressable
        style={styles.btnContainer}
        android_ripple={{color: '#555'}}
        onPress={() => mutate('/rovers')}>
        <Text style={{color: 'lightgreen'}}>Try Again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    color: 'white',
    fontSize: 50,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    color: '#fc3d21',
  },
  btnContainer: {
    marginTop: 20,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
  },
});

export default SomethingWentWrong;
