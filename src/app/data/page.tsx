'use client'

import MainPageClient from '../_components/MainPageClient'
import Header from '../_components/Header'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import InfoBottomSheet from '../_components/InfoBottomSheet'
import { InfoDatas } from '@/data/types'

export default function Page() {
  const params = useSearchParams()
  const category = params.get('category') ?? '400'
  const region = params.get('region') ?? ''
  const [data, setData] = useState<any[]>([])
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/kamis?category=${category}&region=${region}`
        )
        const kamisData = await res.json()
        setData(kamisData?.data?.item ?? [])
      } catch (error) {
        console.error('[Kamis Fetch Error]', error)
        throw error
      }
    }

    fetchData()
  }, [category, region])

  return (
    <>
      <Header
        title={'재료 시세'}
        iconSrc="/icons/info.svg"
        onClick={() => setShowInfo(true)}
      />
      <MainPageClient data={data} />
      <InfoBottomSheet
        visible={showInfo}
        onClose={() => setShowInfo(false)}
        InfoDatas={InfoDatas}
      />
    </>
  )
}
