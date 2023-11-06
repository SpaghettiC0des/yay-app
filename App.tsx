import {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';
import {StatusBar} from 'expo-status-bar';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';

if (__DEV__) {
  console.log('use emulator');
  firestore().useEmulator('localhost', 8080);
  auth().useEmulator('http://localhost:9099');
  functions().useEmulator('localhost', 5001);
  storage().useEmulator('localhost', 9199);
}

function download(url: string, options?: object) {
  if (!url) {
    return Promise.reject('url is required');
  }
  return functions().httpsCallable('downloadYoutubeVideo')({url, options});
}

export default function App() {
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        return auth().signInAnonymously();
      }
    });
  }, []);

  const [url, setUrl] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput placeholder="YouTube URL" onChangeText={setUrl} />
      <Button
        title="Download"
        onPress={async () => {
          try {
            const r = await download(url);
            Alert.alert('Downloaded', JSON.stringify(r, null, 2));
          } catch (e) {}
        }}
      />
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
