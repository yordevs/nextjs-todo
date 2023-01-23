// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBboMeB1ICRYTTbYyE4D5k3NsRz56qhxls",

  authDomain: "nextjs-todo-bc671.firebaseapp.com",

  projectId: "nextjs-todo-bc671",

  storageBucket: "nextjs-todo-bc671.appspot.com",

  messagingSenderId: "124031718033",

  appId: "1:124031718033:web:0c2a6b2fbbe306bb012530",

  measurementId: "G-HWCGFLL54E",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
