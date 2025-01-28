// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyuTZ-kE2QaR6aY1yt6n772yaKSivRLp4",
  authDomain: "office-management-app-dbc2c.firebaseapp.com",
  projectId: "office-management-app-dbc2c",
  storageBucket: "office-management-app-dbc2c.firebasestorage.app",
  messagingSenderId: "917303890880",
  appId: "1:917303890880:web:8cadd1883a992c66fb2e25",
  measurementId: "G-QKK07FLLSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);