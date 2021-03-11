import React from 'react';
import {SWRConfig} from 'swr';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import fetcher from './utils/fetcher';
import {StatusBar} from 'react-native';
import * as screens from './screens';

enableScreens();

const Stack = createStackNavigator();

function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
        loadingTimeout: 7,
        errorRetryCount: 2,
      }}>
      <StatusBar backgroundColor="#111" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={screens.Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Explore" component={screens.Explore} />
        </Stack.Navigator>
      </NavigationContainer>
    </SWRConfig>
  );
}

export default App;
