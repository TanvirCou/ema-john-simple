import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => { 
    const app = initializeApp(firebaseConfig);
}


export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
      .then(res => {
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          password: '',
          success: true
        }
        return signedInUser;
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }


  export const handleGoogleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          success: false
        }
        return signedOutUser;
      })
      .catch(err => {
        console.log(err);
      })
  };


 export const createUserWithEmailAndPass = (name, email, password) => {
    const auth = getAuth();
      return createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(name);
          return newUserInfo;
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.code;
          newUserInfo.success = false;
          return newUserInfo;
        });
  }


export const signInWithEmailAndPass = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
  })
  .catch((error) => {
    const newUserInfo = {};
    newUserInfo.error = error.code;
    newUserInfo.success = false;
    return newUserInfo;
  });
}  



const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then((res) => {
        console.log('succesfully done');
    }).catch((error) => {
      console.log(error);
    });
   }

//const app = initializeApp(firebaseConfig);