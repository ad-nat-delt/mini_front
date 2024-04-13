import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const RecordScreen = () => {
  const [recording, setRecording] = useState();
  const [play, setPlay]=useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldPlayAfterRecording, setShouldPlayAfterRecording] = useState(false);
  const navigation = useNavigation();
  const [uri, setURI] = useState(null); 

  async function startRecording() {
    
    try {
      
      setShouldPlayAfterRecording(false);
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
    try {
      setPlay(true);
      console.log('Stopping recording..');
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      setURI(uri); // Set uri globally
      setRecording(undefined);
      console.log('Recording stopped and stored at', uri);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  async function playSound(uri) {
    try {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
  
  async function stopSound() {
    try {
      if (sound) {
        console.log('Stopping Sound');
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
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
        onPress={async () => {
          if(!recording)
          {
            setPlay(false);
            startRecording();
          }
          else
          {
            stopRecording()
          }
       }}

      >
        <Text style={styles.buttonText}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
      {play && (
        <View>
          <TouchableOpacity 
          style={styles.button}           
            onPress={() => {
              setShouldPlayAfterRecording(true);
              playSound(uri);
            }}
            
          ><Text style={styles.buttonText}>Replay</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.button}           
            onPress={() => navigation.navigate('Functions')}
          >
          <Text style={styles.buttonText}>Go to functions</Text>
          </TouchableOpacity>
        </View>
      )}
      {shouldPlayAfterRecording && isPlaying && 
      // (
      //   <Button title="Stop Playback" onPress={stopSound} />
      // )
      <View>
        <TouchableOpacity 
          style={styles.button}           
          onPress={stopSound}
          >
          <Text style={styles.buttonText}>Stop playback</Text>
          </TouchableOpacity>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF694',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#D67638',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center'
  },
});

export default RecordScreen;