'use client'

import useAuth from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getUserData } from '@/lib/userData'
import Link from 'next/link'

export default function HomePage() {
  const { user, loading } = useAuth()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then(setData)
    }
  }, [user])

  console.log(data)

  if (loading) return <div>로딩중.....</div>

  return (
    <div>
      <h1>안녕하세요, {user?.email}</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {!user && <Link href={'/login'}>로그인 하기</Link>}
    </div>
  )
}
