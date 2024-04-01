// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// import 'firebase/analytics';
// import 'firebase/hosting';
// import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC4GbeC5Wz7LtxVgdWzN7sOAdz10MjSlrI",
    authDomain: "tasm-tour.firebaseapp.com",
    projectId: "tasm-tour",
    storageBucket: "tasm-tour.appspot.com",
    messagingSenderId: "602869699809",
    appId: "1:602869699809:web:7b8620b4a0e64d7fa4d3a0",
    measurementId: "G-SDPB3H33EV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
