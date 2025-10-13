'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'

export type FilterOption = {
  id: string
  label: string
  disabled?: boolean
}

type FilterBottomSheetProps = {
  visible: boolean
  onClose: () => void
  regionOptions: FilterOption[]
  sellerOptions: FilterOption[]
  selectedRegion: string | null
  selectedSeller: string | null
  selectedTab: 'region' | 'seller'
  setSelectedTab: (val: 'region' | 'seller') => void
}

export default function FilterBottomSheet({
  visible,
  onClose,
  regionOptions,
  sellerOptions,
  selectedRegion,
  selectedSeller,
  selectedTab,
  setSelectedTab,
}: FilterBottomSheetProps) {
  const [tempRegion, setTempRegion] = useState<string | null>(selectedRegion)
  const [tempSeller, setTempSeller] = useState<string | null>(selectedSeller)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleReset = () => {
    setTempRegion(null)
    setTempSeller(null)
  }

  const handleConfirm = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (tempRegion) {
      params.set('region', tempRegion)
    } else {
      params.delete('region')
    }
    if (tempSeller) {
      params.set('sales_type', tempSeller)
    } else {
      params.delete('sales_type')
    }
    router.push(`?${params.toString()}`)
    onClose()
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    setTempRegion(selectedRegion ?? null)
  }, [selectedRegion])
  useEffect(() => {
    setTempSeller(selectedSeller ?? null)
  }, [selectedSeller])

  const isPrevRegion = searchParams.get('region')
  const isPrevSeller = searchParams.get('sales_type')
  const selectedCount = (tempRegion ? 1 : 0) + (tempSeller ? 1 : 0)
  const buttonActive =
    (isPrevRegion || isPrevSeller) === null && selectedCount === 0

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.15 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-w-[425px] mx-auto h-[85vh] flex flex-col"
          >
            <div
              ref={wrapperRef}
              className="flex flex-col flex-1 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 pt-4 pb-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">필터</h2>
                <button onClick={onClose} className="text-gray-400">
                  <X size={20} />
                </button>
              </div>

              {/* Tab */}
              <div className="flex gap-2 px-4 pb-3">
                <button
                  className={`flex-1 rounded-full py-2 text-sm border ${
                    selectedTab === 'region'
                      ? 'border-blue-500 text-blue-600 font-semibold bg-blue-50'
                      : 'border-gray-300 text-gray-400'
                  }`}
                  onClick={() => setSelectedTab('region')}
                >
                  지역 {tempRegion ? '1' : ''}
                </button>
                <button
                  className={`flex-1 rounded-full py-2 text-sm border ${
                    selectedTab === 'seller'
                      ? 'border-blue-500 text-blue-600 font-semibold bg-blue-50'
                      : 'border-gray-300 text-gray-400'
                  }`}
                  onClick={() => setSelectedTab('seller')}
                >
                  판매처 {tempSeller ? '1' : ''}
                </button>
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto px-4 pb-[64px]">
                {(selectedTab === 'region' ? regionOptions : sellerOptions).map(
                  option => {
                    const currentValue =
                      selectedTab === 'region' ? tempRegion : tempSeller
                    const selected = currentValue
                      ? currentValue === option.label
                      : option.label === '전체'

                    return (
                      <button
                        key={option.label}
                        onClick={() => {
                          selectedTab === 'region'
                            ? setTempRegion(
                                option.label === '전체' ? null : option.label
                              )
                            : setTempSeller(
                                option.label === '전체' ? null : option.label
                              )
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 mb-2 rounded-full ${
                          selected
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-gray-800'
                        }`}
                        disabled={option.disabled}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              selected ? 'border-blue-600' : 'border-gray-300'
                            } ${option.disabled && 'bg-gray-300'}`}
                          >
                            {selected && (
                              <div className="w-3 h-3 bg-blue-600 rounded-full" />
                            )}
                          </span>
                          {option.label}
                        </div>
                        {selected && (
                          <span className="text-blue-600 text-base font-bold">
                            ✓
                          </span>
                        )}
                        {option.disabled && (
                          <span className="text-[#959BA6] text-sm">
                            Coming Soon!
                          </span>
                        )}
                      </button>
                    )
                  }
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[#E4E8EF] px-4 py-4 flex gap-2 bg-white items-center justify-center">
                <div
                  onClick={handleReset}
                  className="border-none rounded-xl py-3 text-sm font-medium w-[100px] text-center cursor-pointer"
                >
                  ↺ 초기화
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={buttonActive}
                  className={` ${
                    !buttonActive ? 'bg-blue-600' : 'bg-gray-400'
                  }  text-white text-sm font-medium py-3 rounded-xl w-full`}
                >
                  필터 검색하기{selectedCount > 0 ? ` ${selectedCount}` : ''}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
