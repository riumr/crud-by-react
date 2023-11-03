import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "crud-20c6e.firebaseapp.com",
  databaseURL: "https://crud-20c6e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-20c6e",
  storageBucket: "crud-20c6e.appspot.com",
  messagingSenderId: "924954677202",
  appId: "1:924954677202:web:096c0b3438e1d449bdc20b",
  measurementId: "G-ZMXN1D26JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);