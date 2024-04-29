//  import { auth } from "./firebase";
//  import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";



//  export const doCreateUserWithEmailAndPassword=async(emai,password)=>{

//      return createUserWithEmailAndPassword(auth, emai,password);

//  }

//  export const doSingInWithEmailAndPassword=async(emai,password)=>{

//      return signInWithEmailAndPassword(auth, emai,password);
    
//  }

//  export const doSingInWithGoogle=async()=>{

//      const provider =new GoogleAuthProvider();
//      const result=await signInWithPopup(auth,provider);
//      //result.user; //save in firestored
//      return result;
    
//  }

//  export const doSingOut=(auth)=>{
//      return auth.signOut(auth);
//  }

//  export const doPasswordReset=(password)=>{
//      return sendPasswordResetEmail(auth,password);
//  }

//  export const doPasswordChaned=(password)=>{
//      return updatePassword(auth.currentUser,password);
//  }



//  export const deSendEmailverification=()=>{
//      return sendEmailVerification(auth.currentUser,{
//          url : `${window.location.origin}/`,
//      });
//  }
