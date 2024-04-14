import React,{useState,useEffect} from 'react';
import { StyleSheet, View,TouchableOpacity,Text } from 'react-native';
//import { useNavigation } from '@react-navigation/native';


const TranscribeScreen = () => {
    const [trancsription, setTrancsription] = useState('');

    const obtainTranscription = () => 
    {
        // Call your function here to obtain the summary

        const Text ='Obtain trancription text here';

        setTrancsription(Text);
    };
    useEffect(() => {
        obtainTranscription();
      }, []); // Empty dependency array ensures that this effect runs only once after mounting
  return (
    <View style={styles.container}>
    <Text>{trancsription}</Text>
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

export default TranscribeScreen;