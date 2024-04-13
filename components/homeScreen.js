import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';




const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>
        EavesDropper
      </Text>
      <Image
        source={require('../assets/convo.png')}
        style={styles.image}
      />
      <Text style={styles.title}>
        A platform to record your day to day conversations and provide results based on it
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Record')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <Text style={styles.caption}>Tap to get started.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF694',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  head:{
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 45,
    marginBottom: 80,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  image: {
    width: 231,
    height: 218,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#4D2828'
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
  },
  caption: {
    marginTop: 50,
    color: '#4D2828',
    fontSize: 18,
  },
});



// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyApp</Text>
//       <Text style={styles.subtitle}>Your one-stop solution for all your needs</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate('Record')}
//       >
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

export default HomeScreen;