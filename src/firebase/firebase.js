// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdpnZQisaRwxyMNk1xNYNOqhV2goSEbhM",
  authDomain: "loginproject-2c185.firebaseapp.com",
  projectId: "loginproject-2c185",
  storageBucket: "loginproject-2c185.appspot.com",
  messagingSenderId: "994422786673",
  appId: "1:994422786673:web:ede32eab1f3bd35a6aa9d0",
  measurementId: "G-N018Y80SWB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//imp
const auth = getAuth(app);

//imp
export { app, auth };
