import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./index";


export const signup = async (name, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: name });
        return auth.currentUser;
    } catch (error) {
        return error.code;
    }
}

export const login = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.error(error.code);
        return error.code;
    }
}

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return "success";
    } catch (error) {
        return error.code;
    }
}