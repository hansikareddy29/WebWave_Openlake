// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8tiDsz3CUSTW2m-UXNIGr8ECaCPU2Frc",
  authDomain: "bookcycle-b2e79.firebaseapp.com",
  databaseURL: "https://bookcycle-b2e79-default-rtdb.firebaseio.com",
  projectId: "bookcycle-b2e79",
  storageBucket: "bookcycle-b2e79.appspot.com",
  messagingSenderId: "842043412748",
  appId: "1:842043412748:web:57bcd0e56d6c2bb9ae3929",
  measurementId: "G-RQ7VRFETMW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
export const storage = getStorage(app);
