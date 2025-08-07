'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'
// import { setSessionCookie } from '@/lib/setSession'

export default function LoginForm() {
  const router = useRouter()
  const [form, setForm] = useState({ nickname: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(form.nickname, form.password)
      // await setSessionCookie()
      router.push('/') // 로그인 후 이동경로
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          LOGIN
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              Nickname
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="Your nickname"
              value={form.nickname}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm 
                         focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm 
                         focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent
                       text-sm font-medium rounded-xl text-white bg-indigo-600
                       hover:bg-indigo-700 focus:outline-none focus:ring-2
                       focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            {loading ? '로그인 중...' : 'Log In'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-16 bg-gray-200"></span>
          <span className="text-sm text-gray-500">OR</span>
          <span className="h-px w-16 bg-gray-200"></span>
        </div>

        <p className="text-center text-sm text-gray-500">
          아직 계정이 없으신가요?{' '}
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            회원가입
          </a>
        </p>
      </div>
    </div>
  )
}
