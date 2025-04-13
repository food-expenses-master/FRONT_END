import { auth } from "./firebase";

export async function setSessionCookie() {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  }
}
