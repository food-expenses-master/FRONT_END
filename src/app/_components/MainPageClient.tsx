'use client'

import { KamisPriceData, regionOptions, sellerOptions } from '@/data/types'
import { useState } from 'react'
import CategorySelector from './CategorySelector'
import SortSelector from './SortSelector'
import { getDisplayName } from '@/data/utils'
import FilterBottomSheet from './FilterBottomSheet'
import FilterSelectTrigger from './FilterSelectTrigger'
import SearchBar from './SearchBar'
import { useScrollInfo } from '@/hooks/useScrollInfo'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

type Props = {
  data: KamisPriceData[]
}

export default function MainPageClient({ data }: Props) {
  const { scrollY, direction } = useScrollInfo()
  const isTabVisible = scrollY > 150 && direction === 'up'

  const [sortKey, setSortKey] = useState('name_asc')
  const [query, setQuery] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [region, setRegion] = useState<string | null>(null)
  const [seller, setSeller] = useState<string | null>(null)

  const regionLabel = regionOptions.find(r => r.id === region)?.label ?? '지역'
  const sellerLabel =
    sellerOptions.find(s => s.id === seller)?.label ?? '판매처'

  const sorted = sortData(
    data.filter(item => item.rank !== '중품'),
    sortKey
  ).filter(item =>
    `${item.item_name} ${item.kind_name}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  )

  return (
    <div className="pb-[100px]">
      <SearchBar onQueryChange={setQuery} />
      <CategorySelector />
      <hr className="-mx-4 border-t border-[#F3F4F8]" />
      <div className="flex gap-2 py-2">
        <FilterSelectTrigger
          label={regionLabel}
          active={regionLabel !== '지역'}
          onClick={() => setShowFilter(true)}
        />
        <FilterSelectTrigger
          label={sellerLabel}
          active={sellerLabel !== '판매처'}
          onClick={() => setShowFilter(true)}
        />
      </div>

      <FilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        regionOptions={regionOptions}
        sellerOptions={sellerOptions}
        selectedRegion={region}
        selectedSeller={seller}
        setSelectedRegion={setRegion}
        setSelectedSeller={setSeller}
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
        sorted.map((item, idx) => {
          const displayPrice = item.dpr1 !== '-' ? item.dpr1 : item.dpr2 ?? '-'

          const [recent, prev] = [item.dpr1, item.dpr2]
            .map(parsePrice)
            .filter((n): n is number => n !== null)

          const rate =
            recent !== undefined && prev !== undefined && prev !== 0
              ? ((recent - prev) / prev) * 100
              : null

          const isUp = rate !== null && rate > 0
          const isDown = rate !== null && rate < 0
          const rateText =
            rate !== null
              ? `${isUp ? '+' : isDown ? '-' : ''}${Math.abs(rate).toFixed(2)}%`
              : '-'
          const icon = isUp ? 'up' : isDown ? 'down' : ''

          return (
            <div
              key={`${item.item_code}-${item.kind_code}`}
              className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div>
                  <div className="text-base font-medium text-gray-900 mb-1 flex items-center">
                    {getDisplayName(item.item_name, item.kind_name)}
                    <ChevronRight size={18} className={'text-gray-400'} />
                  </div>
                  <div className="text-[13px] text-gray-400">
                    유통업체 · 상품 · 1kg
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-medium text-gray-900 mb-1">
                  {displayPrice}원
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
                      {rateText}
                      <Image
                        src={`/icons/${icon}.svg`}
                        alt={icon}
                        width={16}
                        height={16}
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
          <button className="bg-blue-600 text-white font-medium py-[7.5px] px-4 mt-4 rounded-xl">
            전체 품목 보기
          </button>
        </div>
      )}
    </div>
  )
}

function parsePrice(value: string): number | null {
  if (!value || value === '-' || isNaN(Number(value.replace(/,/g, ''))))
    return null
  return parseInt(value.replace(/,/g, ''), 10)
}

function sortData(data: KamisPriceData[], sortKey: string): KamisPriceData[] {
  const parsePrice = (val: string): number => {
    const num = parseInt(val?.replace(/,/g, '') || '', 10)
    return isNaN(num) ? Infinity : num
  }

  const compareRate = (item: KamisPriceData) => {
    const today = parsePrice(item.dpr1)
    const yesterday = parsePrice(item.dpr2)
    return yesterday ? ((today - yesterday) / yesterday) * 100 : 0
  }

  const normalizeName = (name: string) =>
    name
      .replace(/\([^)]*\)/g, '')
      .replace(/\s+/g, '')
      .toLowerCase()

  switch (sortKey) {
    case 'price_asc':
      return [...data].sort((a, b) => parsePrice(a.dpr1) - parsePrice(b.dpr1))
    case 'price_desc':
      return [...data].sort((a, b) => parsePrice(b.dpr1) - parsePrice(a.dpr1))
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
