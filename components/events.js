import React from 'react';
import { StyleSheet, View,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const EventScreen = () => {
    async function markEvents()
    {
        //Mark event logic here
    }
    async function addEvents()
    {
        //add more events here
    }
  return (
    <View style={styles.container}>
        <Text>Mention events here</Text> 
        <TouchableOpacity 
          style={styles.button}           
          onPress={markEvents}
          >
          <Text style={styles.buttonText}>Mark Events</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}           
          onPress={addEvents}
          >
          <Text style={styles.buttonText}>Add events</Text>
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

export default EventScreen;