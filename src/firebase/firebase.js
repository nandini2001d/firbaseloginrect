// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY_ ,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_ ,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_ ,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_ , 
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_ ,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID_ ,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_ ,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_
};

//imp

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



export { app, auth };