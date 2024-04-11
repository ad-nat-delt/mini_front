import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const functionScreen = () => {
  const handleTranscribe = () => {
    // Add your transcription logic here
    console.log('Transcribe button pressed');
  };

  const handleSummarize = () => {
    // Add your summarization logic here
    console.log('Summarize button pressed');
  };

  const handleRecordEvents = () => {
    // Add your event recording logic here
    console.log('Record Events button pressed');
  };

  return (
    <View style={styles.container}>
      <Button title="Transcribe" onPress={handleTranscribe} />
      <Button title="Summarize" onPress={handleSummarize} />
      <Button title="Record Events" onPress={handleRecordEvents} />
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

export default functionScreen;