export const login = async (nickname: string, password: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, password }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('로그인 실패:', errorText)
      throw new Error('로그인 요청 실패')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('login error:', error)
    throw error
  }
}

export interface SignupData {
  nickname: string
  email: string
  password: string
}

export const signup = async ({ nickname, email, password }: SignupData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, email, password }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('회원가입 API 에러:', text)
    throw new Error('회원가입에 실패했습니다.')
  }

  return res.json()
}

export const loginWithGoogle = async () => {
  // const provider = new GoogleAuthProvider()
  // const result = await signInWithPopup(auth, provider)
  // return result.user
}

export const loginWithGoogleRedirect = async () => {
  // const provider = new GoogleAuthProvider()
  // await signInWithRedirect(auth, provider)
}

// 이건 로그인 후 돌아온 다음 페이지에서 처리
export const handleGoogleRedirectResult = async () => {
  // const result = await getRedirectResult(auth)
  // if (result && result.user) {
  // 사용자 정보를 저장할 수 있음
  // return result.user
  // }
  // return null
}

export const logout = async () => {
  // await signOut(auth)
}
