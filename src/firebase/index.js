import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8dCHNatuQ30Xm8CPp9BFQaJVZ8qHvryI",
  authDomain: "september-b9050.firebaseapp.com",
  projectId: "september-b9050",
  storageBucket: "september-b9050.appspot.com",
  messagingSenderId: "962963747499",
  appId: "1:962963747499:web:1b9dbb092cb3967dabbdee"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);