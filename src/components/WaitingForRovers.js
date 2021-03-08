import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

function WaitingForRovers() {
  return (
    <View style={styles.container}>
      <Text style={styles.robot}>🔭</Text>
      <Text style={styles.textLoading}>Searching for available rovers</Text>
      <Text style={styles.subText}>
        👽 We are connecting with the rovers on Mars
      </Text>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  subText: {
    color: 'green',
    marginBottom: 10,
  },
  textLoading: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    marginBottom: 10,
  },
  robot: {
    fontSize: 55,
  },
});

export default WaitingForRovers;
