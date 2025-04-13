import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export async function setSessionCookie() {
  return new Promise<void>((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const token = await user.getIdToken();
      if (!token) return;

      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        console.error("❌ 세션 설정 실패", await res.text());
      } else {
        console.log("✅ 세션 쿠키 설정 완료");
      }

      resolve();
    });
  });
}
