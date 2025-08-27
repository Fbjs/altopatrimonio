
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "altopatrimonio-invest",
  appId: "1:973668492324:web:514962946757ab3c98a4b1",
  storageBucket: "altopatrimonio-invest.firebasestorage.app",
  apiKey: "AIzaSyDsRTjRzEqnbWYZdP3Si_JZaJWscOO7TiU",
  authDomain: "altopatrimonio-invest.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "973668492324"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
