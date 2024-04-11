import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

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
        <TouchableOpacity
            style={styles.button}
            onPress={recording ? stopRecording : startRecording}
            >
            <Text style={styles.buttonText}>
                {recording ? 'Stop Recording' : 'Start Recording'}
            </Text>

      </TouchableOpacity>
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

export default RecordScreen;