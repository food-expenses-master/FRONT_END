import { createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const login = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signup = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  return result.user
}


export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
}


export const loginWithGoogleRedirect = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithRedirect(auth, provider)
}

// 이건 로그인 후 돌아온 다음 페이지에서 처리
export const handleGoogleRedirectResult = async () => {
  const result = await getRedirectResult(auth)
  if (result && result.user) {
    // 사용자 정보를 저장할 수 있음
    return result.user
  }
  return null
}

export const logout = async () => {
  await signOut(auth);
};
