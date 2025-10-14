'use client'

import MainPageClient from '../_components/MainPageClient'
import Header from '../_components/Header'
import { useState } from 'react'
import InfoBottomSheet from '../_components/InfoBottomSheet'
import { InfoDatas } from '@/data/types'

export default function Page() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <Header
        title={'재료 시세'}
        iconSrc="/icons/info.svg"
        onClick={() => setShowInfo(true)}
      />
      <MainPageClient />
      <InfoBottomSheet
        visible={showInfo}
        onClose={() => setShowInfo(false)}
        InfoDatas={InfoDatas}
        title="가격 데이터 업데이트"
        icon="check"
      />
    </>
  )
}
