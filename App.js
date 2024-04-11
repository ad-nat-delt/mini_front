import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/homeScreen';
import RecordScreen from './components/recordAudio';
import functionScreen from './components/functions.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="Functions" component={functionScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}