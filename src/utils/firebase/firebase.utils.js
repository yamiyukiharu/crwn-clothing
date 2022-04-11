import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docref = doc(collectionRef, object.title.toLowerCase());
        batch.set(docref, object);
    })

    await batch.commit();

}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q  = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, documentSnapshot) => {
        const {title, items} = documentSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}