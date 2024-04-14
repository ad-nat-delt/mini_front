import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/homeScreen';
import RecordScreen from './components/recordAudio';
import FunctionScreen from './components/functions.js';
import TranscribeScreen from './components/transcribe.js';
import SummarizeScreen from './components/summarize.js';
import EventScreen from './components/events.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="Functions" component={FunctionScreen} />
        <Stack.Screen name="Transcribe" component={TranscribeScreen} />
        <Stack.Screen name="Summarize" component={SummarizeScreen} />
        <Stack.Screen name="Events" component={EventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}