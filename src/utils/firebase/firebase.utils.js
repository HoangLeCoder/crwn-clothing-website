import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBC_7JWxA75zSTQ-szJ7EotjYtuoUqRRFc",
    authDomain: "crwn-clothing-db-23c5f.firebaseapp.com",
    projectId: "crwn-clothing-db-23c5f",
    storageBucket: "crwn-clothing-db-23c5f.appspot.com",
    messagingSenderId: "319265303460",
    appId: "1:319265303460:web:bb17efa7282c93dc8f2f31",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account", // Forces account selection even if one account is available
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log("Error creating document:", error.message);
        }
    }
    
    return userDocRef;
};
