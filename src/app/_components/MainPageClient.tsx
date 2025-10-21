'use client'

import { regionOptions, sellerOptions } from '@/data/types'
import { useEffect, useState } from 'react'
import CategorySelector from './CategorySelector'
import SortSelector from './SortSelector'
import FilterBottomSheet from './FilterBottomSheet'
import FilterSelectTrigger from './FilterSelectTrigger'
import SearchBar from './SearchBar'
import { useScrollInfo } from '@/hooks/useScrollInfo'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { foodList } from '../api/food'
import Link from 'next/link'

type foodData = {
  id: number
  item_name: string
  price: number
  price_change_rate: string
  rank: string
  unit: string
  day: string
  category: string
  sales_type: string
  sales_region: string
}

export default function MainPageClient() {
  const { scrollY, direction } = useScrollInfo()
  const isTabVisible = scrollY > 150 && direction === 'up'

  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category') ?? ''
  const region = searchParams.get('region') ?? null
  const salesType = searchParams.get('sales_type') ?? null

  const [data, setData] = useState<foodData[]>([])
  const [sortKey, setSortKey] = useState('name_asc')
  const [query, setQuery] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'region' | 'seller'>('region')

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

  const sorted = sortData(data, sortKey).filter(item =>
    `${item.item_name}`.toLowerCase().includes(query.trim().toLowerCase())
  )

  const resetFilter = () => {
    router.push(window.location.pathname)
    setQuery('')
  }

  const onClickTrigger = (type: 'region' | 'seller') => {
    setSelectedTab(type)
    setShowFilter(true)
  }

  return (
    <div className="pb-[100px]">
      <SearchBar query={query} onQueryChange={setQuery} />
      <CategorySelector />
      <hr className="-mx-4 border-t border-[#F3F4F8]" />
      <div className="flex gap-2 py-2">
        <FilterSelectTrigger
          label={region ?? '지역'}
          active={region !== null}
          onClick={() => onClickTrigger('region')}
        />
        <FilterSelectTrigger
          label={salesType ?? '판매처'}
          active={salesType !== null}
          onClick={() => onClickTrigger('seller')}
        />
      </div>

      <FilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        regionOptions={regionOptions}
        sellerOptions={sellerOptions}
        selectedRegion={region}
        selectedSeller={salesType}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div
        className={`
          flex justify-between items-center
        sticky z-30 bg-white transition-[top] duration-200 py-2
      `}
        style={{ top: isTabVisible ? 138 : 48 }}
      >
        <div className="text-gray-400 text-[14px] font-normal">
          전체 <span className="font-medium">{sorted.length}</span>
        </div>
        <div className="flex items-center text-gray-800 font-medium space-x-1">
          <SortSelector onChange={setSortKey} />
        </div>
      </div>

      {sorted.length > 0 ? (
        sorted.map(item => {
          const rate = parseFloat(item.price_change_rate)
          const isUp = rate !== null && rate > 0
          const isDown = rate !== null && rate < 0
          const icon = isUp ? 'up' : isDown ? 'down' : ''

          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0"
            >
              <div>
                <Link
                  href={`/${item.id}`}
                  className="text-base font-medium text-gray-900 mb-1 flex items-center"
                >
                  {item.item_name}({item.rank})
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
                <div className="text-[13px] text-gray-400">
                  {item.sales_type} · {'-'} · {item.unit} ·{' '}
                  {item.day.replace(' · ', '')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-medium text-gray-900 mb-1">
                  {item.price.toLocaleString()}원
                </div>
                <div
                  className={`text-[13px] font-medium flex justify-end ${
                    isUp
                      ? 'text-red-500'
                      : isDown
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  {isUp || isDown ? (
                    <>
                      {item.price_change_rate}
                      <Image
                        src={`/icons/${icon}.svg`}
                        alt={icon}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="py-20 text-center font-medium">
          <div>검색 결과가 없어요</div>
          <button
            className="bg-blue-600 text-white font-medium py-[7.5px] px-4 mt-4 rounded-xl"
            onClick={() => resetFilter()}
          >
            전체 품목 보기
          </button>
        </div>
      )}
    </div>
  )
}

function sortData(data: foodData[], sortKey: string): foodData[] {
  const compareRate = (item: foodData) => {
    const rate = parseFloat(item.price_change_rate.replace('%', ''))
    return isNaN(rate) ? 0 : rate
  }

  const normalizeName = (name: string) =>
    name
      .replace(/\([^)]*\)/g, '')
      .replace(/\s+/g, '')
      .toLowerCase()

  switch (sortKey) {
    case 'price_asc':
      return [...data].sort((a, b) => a.price - b.price)
    case 'price_desc':
      return [...data].sort((a, b) => b.price - a.price)
    case 'name_asc':
      return [...data].sort((a, b) =>
        normalizeName(a.item_name).localeCompare(normalizeName(b.item_name))
      )
    case 'drop_desc':
      return [...data].sort((a, b) => compareRate(a) - compareRate(b))
    case 'rise_desc':
      return [...data].sort((a, b) => compareRate(b) - compareRate(a))
    default:
      return data
  }
}
