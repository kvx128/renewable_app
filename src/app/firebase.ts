// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzTQ_I3WWA45zJyDo_WJhL0TgOdkzH0S0",
  authDomain: "renewable-energy-project-1c67f.firebaseapp.com",
  projectId: "renewable-energy-project-1c67f",
  storageBucket: "renewable-energy-project-1c67f.firebasestorage.app",
  messagingSenderId: "447592928913",
  appId: "1:447592928913:web:16524652e34715f6a45130",
  databaseURL: "https://renewable-energy-project-1c67f-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);