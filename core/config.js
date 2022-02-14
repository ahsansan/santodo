// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeqSZpvSnCiOp3sGUnasUySxkJgGLYxmo",
  authDomain: "san-todo-87755.firebaseapp.com",
  databaseURL:
    "https://san-todo-87755-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "san-todo-87755",
  storageBucket: "san-todo-87755.appspot.com",
  messagingSenderId: "297322252460",
  appId: "1:297322252460:web:7a40e6846b9bbaf05cf709",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
