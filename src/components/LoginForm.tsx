'use client';

import { useState } from "react";
import { login } from "@/lib/auth";
import { setSessionCookie } from "@/lib/setSession";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      await setSessionCookie();
      router.push("/protected"); // 로그인 후 이동경로
    } catch (err: any) {
      setError("로그인 실패: " + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold">로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        로그인
      </button>
    </form>
  );
}
