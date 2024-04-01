import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4GbeC5Wz7LtxVgdWzN7sOAdz10MjSlrI",
    authDomain: "tasm-tour.firebaseapp.com",
    projectId: "tasm-tour",
    storageBucket: "tasm-tour.appspot.com",
    messagingSenderId: "602869699809",
    appId: "1:602869699809:web:7b8620b4a0e64d7fa4d3a0",
    measurementId: "G-SDPB3H33EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db };
