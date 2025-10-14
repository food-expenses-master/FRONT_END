'use client'

import { Suspense, useState } from 'react'
import Header from './_components/Header'
import MainPageClient from './_components/MainPageClient'
import InfoBottomSheet from './_components/InfoBottomSheet'
import { InfoDatas } from '@/data/types'

export default function HomePage() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <main>
      {/* <Header title={'홈'} />
      <p className="text-gray-600 text-sm pb-60">
        환영합니다! 식비마스터에 잘 오셨어요.
      </p>
      <HomePageClientComponent /> */}
      <Header
        title={'재료 시세'}
        iconSrc="/icons/info.svg"
        onClick={() => setShowInfo(true)}
      />
      <Suspense>
        <MainPageClient />
      </Suspense>
      <InfoBottomSheet
        visible={showInfo}
        onClose={() => setShowInfo(false)}
        InfoDatas={InfoDatas}
        title="가격 데이터 업데이트"
        icon="check"
      />
    </main>
  )
}
