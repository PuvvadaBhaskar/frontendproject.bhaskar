import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1V2vFnBaqJXnOyJsyo4YOQilHdJabODc",
  authDomain: "frontend-494bd.firebaseapp.com",
  projectId: "frontend-494bd",
  storageBucket: "frontend-494bd.firebasestorage.app",
  messagingSenderId: "1062093293978",
  appId: "1:1062093293978:web:bb78cb454ba4024af85223",
  measurementId: "G-GJ9151J3TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
