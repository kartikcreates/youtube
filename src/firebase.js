// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRyfnRaHsuxTyRYWPbN_RhfBBiMNlKzkI",
  authDomain: "suniltube-9aa5a.firebaseapp.com",
  projectId: "suniltube-9aa5a",
  storageBucket: "suniltube-9aa5a.appspot.com",
  messagingSenderId: "424631212630",
  appId: "1:424631212630:web:0125d624492a74900639f7"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const provider = new GoogleAuthProvider();

const storage=getStorage(app)

export   {auth,provider,storage}