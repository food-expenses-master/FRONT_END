'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  // const { user, loading } = useAuth()
  const [data, setData] = useState<any>(null)

  // useEffect(() => {
  //   if (user) {
  //     getUserData(user.uid).then(setData)
  //   }
  // }, [user])

  // if (loading) return <div>로딩중.....</div>

  return (
    <div>
      <h1>안녕하세요</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {<Link href={'/login'}>로그인 하기</Link>}
    </div>
  )
}
