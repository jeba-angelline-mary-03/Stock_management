// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-TdU9mhDUlKVcPatkjBcz4OSjw8pLeHU",
  authDomain: "stock-management-2eea4.firebaseapp.com",
  projectId: "stock-management-2eea4",
  storageBucket: "stock-management-2eea4.appspot.com",
  messagingSenderId: "1041504003045",
  appId: "1:1041504003045:web:19b4daa4ae1fe20a74c50c",
  measurementId: "G-TQRFX3KE11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider;
const db=getFirestore(app);
export {auth,googleProvider,db};