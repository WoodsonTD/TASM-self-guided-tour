import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/analytics';
// import 'firebase/hosting';
// import 'firebase/auth';

const { initializeApp, getAnalytics } = firebase;

const firebaseConfig = {
    apiKey: "AIzaSyC4GbeC5Wz7LtxVgdWzN7sOAdz10MjSlrI",
    authDomain: "tasm-tour.firebaseapp.com",
    projectId: "tasm-tour",
    storageBucket: "tasm-tour.appspot.com",
    messagingSenderId: "602869699809",
    appId: "1:602869699809:web:7b8620b4a0e64d7fa4d3a0",
    measurementId: "G-SDPB3H33EV"
};

let app, analytics;

try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

export { app, analytics };
