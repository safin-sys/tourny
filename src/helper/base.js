import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyB_Sy1GXeyVy-jz-7q6eHOvL33S9bzuWy8",
    authDomain: "tourny-1285c.firebaseapp.com",
    projectId: "tourny-1285c",
    storageBucket: "tourny-1285c.appspot.com",
    messagingSenderId: "261080943843",
    appId: "1:261080943843:web:76a4ad8c8f62498051c9d6"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const app = firebase.app()
export const auth = app.auth()
export const db = app.firestore()