// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIcXkdP1c4QUcPsC4qwC9OL35tEdwJg5s",
  authDomain: "vite-contact-9a6a3.firebaseapp.com",
  projectId: "vite-contact-9a6a3",
  storageBucket: "vite-contact-9a6a3.appspot.com",
  messagingSenderId: "1070497037492",
  appId: "1:1070497037492:web:514ef553488cf7f941ebe1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
