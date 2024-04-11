import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import functionScreen from './functions';

const RecordScreen = () => {
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState();
    const navigation = useNavigation();
  
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
      navigation.navigate('Functions');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecordScreen;