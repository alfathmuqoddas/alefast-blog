import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApqQfQgXn3fjx1yodeqPz0MyT-SXA9-8A",
  authDomain: "alefast-blog.firebaseapp.com",
  projectId: "alefast-blog",
  storageBucket: "alefast-blog.appspot.com",
  messagingSenderId: "828766523311",
  appId: "1:828766523311:web:61963f87fff53fbb48a95a",
  measurementId: "G-SFM50TX4MJ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
