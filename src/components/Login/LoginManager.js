import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    const app = initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    password: '',
                    photoURL: photoURL,
                    success: true
                }
                setUserToken();
                return signedInUser;
            })
            .catch(err => {
                const newUserInfo = {};
                newUserInfo.error = err.code;
                newUserInfo.success = false;
                return newUserInfo;
            });
}

export const handleGoogleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photoURL: '',
                    success: false
                }
                return signedOutUser;
            })
            .catch(err => {
                const newUserInfo = {};
                newUserInfo.error = err.code;
                newUserInfo.success = false;
                return newUserInfo;
            });
}

const setUserToken = () => {
    getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

export const createUserWithEmailAndPass = (firstName, lastName, email, password) => {
    const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    updateUserName(firstName, lastName);
                    verifyEmail();
                    return newUserInfo;
                })
                .catch(err => {
                    const newUserInfo = {};
                    newUserInfo.error = err.message;
                    newUserInfo.success = false;
                    return newUserInfo;
                });
}

export const signInWithEmailAndPass = (email, password) => {
    const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const { displayName, email, emailVerified } = res.user;
                    const user = {
                        name: displayName,
                        email: email,
                        emailVerified
                    }
                    user.error = '';
                    user.success = true;
                    setUserToken();                  
                    return user;
                })
                .catch((error) => {
                   const user = {};
                    user.error = error.message;
                    user.success = false;
                    return user;
                });
}

const updateUserName = (firstName, lastName) => {
    const fullName = firstName + " " + lastName;
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: fullName
    })
        .then(res => {
            console.log("Successfully done");
        })
        .catch(error => {
            console.log(error.message);
        });
}


const verifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
    // Email verification sent!
    // ...
  });
}

export const resetPassword = (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
