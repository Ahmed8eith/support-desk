// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFvJIVg4YY18VM2YzF1UmGbv1z3oobFas",
  authDomain: "support-desk-83b3a.firebaseapp.com",
  projectId: "support-desk-83b3a",
  storageBucket: "support-desk-83b3a.appspot.com", // Fix the typo here (firebasestorage.app → appspot.com)
  messagingSenderId: "516372626572",
  appId: "1:516372626572:web:2d8ecdca9284c9f4494fa9",
  measurementId: "G-19XJ10ZJ6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export Authentication
export const db = getFirestore(app); // Export Firestore
