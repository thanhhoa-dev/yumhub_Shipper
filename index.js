/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAE4qx-ZYTxuja5FS2SaASc6VHRjBohezA",
    authDomain: "yumhub-api-c3646.firebaseapp.com",
    projectId: "yumhub-api-c3646",
    storageBucket: "yumhub-api-c3646.appspot.com",
    messagingSenderId: "185943946998",
    appId: "1:185943946998:android:7e3d075fb21d2c85f75ed7",
    databaseURL: "yumhub-api-c3646"
  };
  
  // Initialize Firebase
  let app;
  if (firebase.apps.length === 0) {
      app = firebase.initializeApp(firebaseConfig )
  } else {
      app = firebase.app()
  }

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
