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

// 장바구니 저장 키
const STORAGE_KEY = 'shoppingList'

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

  const [selectedItems, setSelectedItems] = useState<
    { name: string; price: string }[]
  >([])

  const toggleItem = (name: string, price: string) => {
    const exists = selectedItems.some(item => item.name === name)
    if (exists) {
      setSelectedItems(prev => prev.filter(item => item.name !== name))
    } else {
      setSelectedItems(prev => [...prev, { name, price }])
    }
  }

  function isItemSelected(
    selectedItems: { name: string }[],
    itemName: string
  ): boolean {
    return selectedItems.some(sel => sel.name === itemName)
  }

  const handleAddToCart = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedItems))
    setSelectedItems([])
  }

  return (
    <div className="pb-[100px]">
      <SearchBar onQueryChange={setQuery} />
      <CategorySelector />

      <div className="flex gap-2 py-2 border-t border-[#F3F4F8]">
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
        sticky z-30 bg-white transition-[top] duration-200
      `}
        style={{ top: isTabVisible ? 156 : 60 }}
      >
        <div className="text-gray-400">
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
          const icon = isUp ? '▲' : isDown ? '▼' : ''

          return (
            <div
              key={`${item.item_code}-${item.kind_code}`}
              className="flex items-center justify-between py-4 px-2"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isItemSelected(
                    selectedItems,
                    getDisplayName(item.item_name, item.kind_name)
                  )}
                  onChange={() =>
                    toggleItem(
                      getDisplayName(item.item_name, item.kind_name),
                      displayPrice
                    )
                  }
                  className="hidden"
                />

                <div
                  onClick={() =>
                    toggleItem(
                      getDisplayName(item.item_name, item.kind_name),
                      displayPrice
                    )
                  }
                  className={`
        w-5 h-5 flex items-center justify-center rounded-sm cursor-pointer
        border-2
        ${
          isItemSelected(
            selectedItems,
            getDisplayName(item.item_name, item.kind_name)
          )
            ? 'bg-[#2F76FF] border-[#2F76FF]'
            : 'bg-white border-[#D9DDEB]'
        }
      `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      className={'stroke-white'}
                    />
                  </svg>
                </div>

                <div>
                  <div className="text-[15px] font-semibold text-gray-900">
                    {getDisplayName(item.item_name, item.kind_name)}
                  </div>
                  <div className="text-[13px] text-gray-400">
                    유통업체 · 상품 · 1kg
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-gray-900">
                  {displayPrice}원
                </div>
                <div
                  className={`text-[13px] font-medium ${
                    isUp
                      ? 'text-red-500'
                      : isDown
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  {isUp || isDown ? `${rateText} ${icon}` : '-'}
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="py-20 text-center text-gray-400">
          <div>데이터가 없습니다.</div>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div
          onClick={handleAddToCart}
          className="fixed bottom-0 left-0 right-0 z-30 bg-blue-600 text-white text-center py-4 font-semibold text-lg cursor-pointer"
        >
          장보기 리스트에 담기 +
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
