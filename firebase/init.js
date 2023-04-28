// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA48ncWl7dGzgSN0gJxGyTfz7EUBE3M3bk",
  authDomain: "fir-introduction-d4323.firebaseapp.com",
  projectId: "fir-introduction-d4323",
  storageBucket: "fir-introduction-d4323.appspot.com",
  messagingSenderId: "164444543525",
  appId: "1:164444543525:web:ef930661633258cdc5bdcc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // when exporting const, always import with {brackets shown at App.js}