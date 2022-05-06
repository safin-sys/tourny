import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./index";

export const createUserOnFirestore = (user) => {
    const userRef = doc(db, "users", user.uid);
    setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        profilePicture: null,
        coverPicture: null,
        phoneNumber: null,
        team: null,
    });
}

export const getUserFromFirestore = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists) {
        return userSnap.data();
    } else {
        return null;
    }
}