import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCy-4rH75-ILcbgJPx3amMaoHUEl3fJJtw",
    authDomain: "pku-tools.firebaseapp.com",
    databaseURL: "https://pku-tools.firebaseio.com",
    projectId: "pku-tools",
    storageBucket: "pku-tools.appspot.com",
    messagingSenderId: "202032702286",
    appId: "1:202032702286:web:2daa2ac360e82ee0cfb41f"
  })
  .firestore();
