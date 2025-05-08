// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBbcU3UYgVHzOoybYhAtZmh_YgcTdvqK4k",
    authDomain: "appeducativotcc.firebaseapp.com",
    projectId: "appeducativotcc",
    storageBucket: "appeducativotcc.firebasestorage.app",
    messagingSenderId: "197529378592",
    appId: "1:197529378592:web:3b477abd49d70ebefd8145"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
