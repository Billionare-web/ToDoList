// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore uchun

const firebaseConfig = {
  apiKey: "AIzaSyB4kyqBUylwP4sSyYUrFb6pc5JE1hbr9fY",
  authDomain: "todolist-c1cfe.firebaseapp.com",
  projectId: "todolist-c1cfe",
  storageBucket: "todolist-c1cfe.firebasestorage.app",
  messagingSenderId: "903323826194",
  appId: "1:903323826194:web:3b66ab9965f62ad72b80cb",
};

// Firebase’ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Agar Firestore ishlatsang

export { db };
