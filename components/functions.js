import React from 'react';
import { StyleSheet, View,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const FunctionScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Transcribe')}
        >
        <Text style={styles.buttonText}>
            Transcribe
        </Text>

  </TouchableOpacity>
  <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Summarize')}
        >
        <Text style={styles.buttonText}>
            Summarize
        </Text>

  </TouchableOpacity>
  <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Events')}
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

export default FunctionScreen;