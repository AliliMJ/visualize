import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    apiKey: "AIzaSyBqyHR4wbBfzYXkKscdoSoVdAbp2FugbyA",
    authDomain: "gestmap-de0e2.firebaseapp.com",
    projectId: "gestmap-de0e2",
    storageBucket: "gestmap-de0e2.appspot.com",
    messagingSenderId: "711386265708",
    appId: "1:711386265708:web:89761442871eeae7000049",
});

const firestore = app.firestore();
export const storage = app.storage(); 
export const auth = app.auth();

export const database = {
    users: firestore.collection('users'),
    projects: firestore.collection('projects'),
    activities: firestore.collection('activitites')
};

export default app;
