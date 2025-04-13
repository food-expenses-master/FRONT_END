import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const login = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signup = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  return result.user
}

export const logout = async () => {
  await signOut(auth);
};
