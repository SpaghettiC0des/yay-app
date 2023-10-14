import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

if (__DEV__) {
  firestore().useEmulator('localhost', 8080);
  auth().useEmulator('http://localhost:9099');
  functions().useEmulator('localhost', 5001);
  storage().useEmulator('localhost', 9199);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
