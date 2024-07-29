import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const app = firebase.initializeApp({

    apiKey: "AIzaSyC0Aa_pszQmIh7mamtbMBIxaGEf2s8mRYE",
    authDomain: "bloggers-zone-1c7a6.firebaseapp.com",
    projectId: "bloggers-zone-1c7a6",
    storageBucket: "bloggers-zone-1c7a6.appspot.com",
    messagingSenderId: "818016314820",
    appId: "1:818016314820:web:92d4b573d1f3e5eb66f091",
    measurementId: "G-G4TVFM281F"
});

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth, app };
