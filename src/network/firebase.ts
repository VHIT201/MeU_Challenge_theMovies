// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHhp5LNLtWOm7WVCJaOW1CoDNHW--Pegw",
  authDomain: "login-auth-b0184.firebaseapp.com",
  projectId: "login-auth-b0184",
  storageBucket: "login-auth-b0184.appspot.com",
  messagingSenderId: "148239476177",
  appId: "1:148239476177:web:d69f5efd2cd68fe9b8ecf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export default app