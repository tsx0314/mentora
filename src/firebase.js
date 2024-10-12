// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Added import for getAnalytics

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvaxnFGd-vKnGHMAiNiW9U39ayl_uKsYI",
  authDomain: "psaproject-65ba9.firebaseapp.com",
  projectId: "psaproject-65ba9",
  storageBucket: "psaproject-65ba9.appspot.com",
  messagingSenderId: "194343275623",
  appId: "1:194343275623:web:21c32a4b821aded7d0d8c2",
  measurementId: "G-C3Z9MG4VJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Initialize Analytics
const auth = getAuth(app);
const db = getFirestore(app);

// Export the Firebase app and services
export { app, auth, db };
