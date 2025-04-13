'use client'

import { loginWithGoogle } from '@/lib/auth'

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle()
      console.log('Google 로그인 성공:', user)
      // router.push('/dashboard') 등 이동
    } catch (err: any) {
      console.error('Google 로그인 실패:', err.message)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 text-white p-2 rounded mt-4"
    >
      Google로 로그인
    </button>
  )
}
