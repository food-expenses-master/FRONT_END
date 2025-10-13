'use client'

import MainPageClient from '../_components/MainPageClient'
import Header from '../_components/Header'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import InfoBottomSheet from '../_components/InfoBottomSheet'
import { InfoDatas } from '@/data/types'
import { foodList } from '../api/food'

export default function Page() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') ?? ''
  const region = searchParams.get('region') ?? ''
  const salesType = searchParams.get('sales_type') ?? ''
  const [data, setData] = useState<any[]>([])
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await foodList(category, region, salesType)
        setData(res?.data ?? [])
      } catch (error) {
        console.error('[Fetch Error]', error)
        throw error
      }
    }
    fetchData()
  }, [category, region, salesType])

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
