import React from 'react';
import { StyleSheet, View,TouchableOpacity,Text } from 'react-native';

const FunctionScreen = () => {
  async function handleTranscribe() {
    // Add your transcription logic here
    console.log('Transcribe button pressed');
  }

  async function handleSummarize() {
    // Add your summarization logic here
    console.log('Summarize button pressed');
  };

  async function handleEvents() {
    // Add your event recording logic here
    console.log('Record Events button pressed');
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity
        style={styles.button}
        onPress={handleTranscribe}
        >
        <Text style={styles.buttonText}>
            Transcribe
        </Text>

  </TouchableOpacity>
  <TouchableOpacity
        style={styles.button}
        onPress={handleSummarize}
        >
        <Text style={styles.buttonText}>
            Summarize
        </Text>

  </TouchableOpacity>
  <TouchableOpacity
        style={styles.button}
        onPress={handleEvents}
        >
        <Text style={styles.buttonText}>
            Events
        </Text>

  </TouchableOpacity>
  </View>
  )
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

export default FunctionScreen;