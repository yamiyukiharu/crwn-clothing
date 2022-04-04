import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore' 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDus9_J5L-1T45korNOkbOHNwBLxA8FIbc",
    authDomain: "crwn-clothing-db-d96b7.firebaseapp.com",
    projectId: "crwn-clothing-db-d96b7",
    storageBucket: "crwn-clothing-db-d96b7.appspot.com",
    messagingSenderId: "814330588404",
    appId: "1:814330588404:web:45f6ae6ba625684e8ec2a1"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, addInfo) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addInfo
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
    }

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}