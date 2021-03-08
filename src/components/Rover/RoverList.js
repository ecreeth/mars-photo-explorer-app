import React from 'react';
import RoverCard from './RoverCard';
import {useNavigation} from '@react-navigation/native';

function RoverList(props) {
  const navigation = useNavigation();
  return props.data.map(rover => {
    return (
      <RoverCard
        {...rover}
        key={rover.id}
        onPress={() => navigation.navigate('Explore', {rover})}
      />
    );
  });
}

export default RoverList;
