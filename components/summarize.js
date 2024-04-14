import React,{useState,useEffect} from 'react';
import { StyleSheet, View,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SummarizeScreen = () => {
    const [summary, setSummary] = useState('');

    const obtainSummary = () => 
    {
        // Call your function here to obtain the summary

        const summaryText ='Obtain summary text here';

        setSummary(summaryText);
    };
    useEffect(() => {
        obtainSummary();
      }, []); // Empty dependency array ensures that this effect runs only once after mounting
  return (
    <View style={styles.container}>
    <Text>{summary}</Text>
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

export default SummarizeScreen;