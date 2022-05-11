// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';// TODO: Add SDKs for Firebase products that you want to use
import 'firebase/database'
import 'firebase/storage'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBadbDp0mLhKdICw7Wc7QV1U8IOB6zMaIE",
    authDomain: "travel-app-2f7d3.firebaseapp.com",
    projectId: "travel-app-2f7d3",
    storageBucket: "travel-app-2f7d3.appspot.com",
    messagingSenderId: "1030296045207",
    appId: "1:1030296045207:web:d2e491d0f1057bccce8bd2",
    measurementId: "G-YVGJ4GWF01"
};

// Initialize Firebase
let Firebase;

if (firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
