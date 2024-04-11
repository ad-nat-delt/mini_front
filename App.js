import React ,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import {  Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';



const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Text style={styles.subtitle}>Your one-stop solution for all your needs</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Record')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const RecordScreen = () => {  
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState();

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();    
    console.log('Recording stopped and stored at', uri);
    playSound(uri);
    //const newPath = moveRecordingToPublicDirectory(uri);
    // if(newPath == null)
    // {
    //   console.log("error");
    // }

  }
  // async function moveRecordingToPublicDirectory(uri) {
  //   try {
  //     console.log("here");
  //     const directory =documentDirectory ;
  //     const fileInfo = await FileSystem.getInfoAsync(directory);
  //     if (!fileInfo.exists) {
  //       await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  //     }
  
  //     const fileName = 'recording_' + Date.now() + '.m4a';
  //     const newPath = directory + 'recordings/' + `${fileName}`
  
  //     // await FileSystem.moveAsync({
  //     //   from: uri,
  //     //   to: newPath,
  //     // });
  //     //await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
  //     await FileSystem.moveAsync({
  //       from: uri,
  //       to: newPath
  //     });
  
  //     console.log('Recording saved at:', newPath);
  //     return newPath;
  //   } catch (error) {
  //     console.error('Error moving recording:', error);
  //     return null;
  //   }
  // }
  async function playSound(uri) {
    // console.log('Loading Sound');
    // //const path = uri
    
    // setSound(sound);

    // console.log('Playing Sound');
    // await sound.playAsync();

    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri });
    //const { sound } = await Audio.Sound.createAsync( require('./files/hello.mp3'));
    setIsPlaying(true); 
    setSound(sound);
    

    console.log('Playing Sound');
    setIsPlaying(false); 
    await sound.playAsync();
    
  }
  async function stopSound() {
    if (sound) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      setIsPlaying(false); 
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {isPlaying && (
        <Button
          title="Stop Playback"
          onPress={stopSound}
        />
      )}
    </View>
  );
};

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Record" component={RecordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

// RecordingOptionsPresets.HIGH_QUALITY = {
//   isMeteringEnabled: true,
//   android: {
//     extension: '.m4a',
//     outputFormat: 'mpeg_4',
//     audioEncoder: 'aac',
//     sampleRate: 44100,
//     numberOfChannels: 2,
//     bitRate: 128000,
//   },
//   ios: {
//     extension: '.m4a',
//     outputFormat: 'mpeg_4',
//     audioQuality: 'max',
//     sampleRate: 44100,
//     numberOfChannels: 2,
//     bitRate: 128000,
//     linearPCMBitDepth: 16,
//     linearPCMIsBigEndian: false,
//     linearPCMIsFloat: false,
//   },
//   web: {
//     mimeType: 'audio/webm',
//     bitsPerSecond: 128000,
//   },
// };
