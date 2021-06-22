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
export const auth = app.auth();
export const storage = firebase.storage();

export const database = {
    users: firestore.collection('users'),
    projects: firestore.collection('projects'),
    activities: firestore.collection('activities'),
};

export const docListen = (docRef, action) => {
    return docRef.onSnapshot((doc) => action(doc.data()));
};

export const getDoc = async (docRef) => {
    const doc = await docRef.get();

    return { ...doc.data(), docID: doc.id };
};

export const getDocs = async (query) => {
    const { docs } = await query.get();
    try {
        return docs.map((doc) => ({ ...doc.data(), docID: doc.id }));
    } catch {
        return [];
    }
};

export default app;
