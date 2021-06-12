import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // apiKey: 'AIzaSyANGOdaR-5UYz9VcA6HEJnglCgBUJstB3I',
    // authDomain: 'auth-pfe.firebaseapp.com',
    // projectId: 'auth-pfe',
    // storageBucket: 'auth-pfe.appspot.com',
    // messagingSenderId: '717723312058',
    // appId: '1:717723312058:web:bff64924d4abe9c18a8783',
});

const firestore = app.firestore();
export const auth = app.auth();

export const database = {
    users: firestore.collection('users'),
    projects: firestore.collection('projects'),
};

export default app;
