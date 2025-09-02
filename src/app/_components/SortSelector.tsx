'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

type SortSelectorProps = {
  onChange: (value: string) => void
}

const sortOptions = [
  { label: '가나다순', value: 'name_asc' },
  { label: '저가순', value: 'price_asc' },
  { label: '고가순', value: 'price_desc' },
  { label: '가격하락순', value: 'drop_desc' },
  { label: '가격상승순', value: 'rise_desc' },
]

export default function SortSelector({ onChange }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('name_asc')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedLabel =
    sortOptions.find(opt => opt.value === selectedValue)?.label ?? ''

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* 표시 영역 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm px-2 py-1 bg-transparent focus:outline-none flex items-center space-x-1"
      >
        <span className="text-gray-800 font-medium">{selectedLabel}</span>
        <span className="text-gray-400 text-[16px] leading-none">
          <Image src="/icons/sort-bar.svg" alt="icon" width={16} height={16} />
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white shadow rounded text-sm z-10">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
