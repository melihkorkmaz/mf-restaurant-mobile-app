import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import KeepAwake from 'react-native-keep-awake';
import PrimaryNav from './src/PrimaryNav'
import * as firebase from "firebase";

const store = configureStore();
var fbConfig = {
  apiKey: "AIzaSyAlstqbGZjsDSy__6sM2ZUV3lGe8UEtg58",
  authDomain: "menu-field.firebaseapp.com",
  databaseURL: "https://menu-field.firebaseio.com",
  projectId: "menu-field",
  storageBucket: "menu-field.appspot.com",
  messagingSenderId: "531651691827"
};
firebase.initializeApp(fbConfig);

var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function (snap) {
  if (snap.val() === true) {
    console.log('CONNECTEDD');
  } else {
    console.log("NOT CONNECTED");
  }
});


const menufieldResMobApp = () => {
  KeepAwake.activate();
  return (
    <Provider store={store}>
      <PrimaryNav />
    </Provider>
  );
}

AppRegistry.registerComponent('menufieldrestaurantmobile', () => menufieldResMobApp);