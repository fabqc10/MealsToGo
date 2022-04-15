import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../App";


export const loginRequest = (email, password) => (
        signInWithEmailAndPassword(auth,email,password)
);