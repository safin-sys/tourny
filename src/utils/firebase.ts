import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyD1F6VQEeNNyL6Lspv1Je9RczMoQS8UJwk",
    authDomain: "tourny-2698e.firebaseapp.com",
    projectId: "tourny-2698e",
    storageBucket: "tourny-2698e.appspot.com",
    messagingSenderId: "884289314766",
    appId: "1:884289314766:web:cdbb927bae799bf42e159f",
    measurementId: "G-91YDKHBSTB",
};

export const app: FirebaseApp = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
