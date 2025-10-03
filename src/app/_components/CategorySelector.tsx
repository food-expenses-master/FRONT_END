'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const categories = [
  { name: '과일', emoji: 'Apple', code: '400' },
  { name: '곡물·견과', emoji: 'Rice', code: '100' },
  { name: '고기·단백질', emoji: 'Meat', code: '500' },
  { name: '고추류', emoji: 'HotPepper', code: '600' },
  { name: '배추류', emoji: 'LeafyGreen', code: '700' },
  { name: '채소류', emoji: 'Carrot', code: '200' },
  { name: '버섯류', emoji: 'Mushroom', code: '800' },
  { name: '식품', emoji: 'Food', code: '900' },
  { name: '양념', emoji: 'Jar', code: '300' },
  { name: '과채', emoji: 'Tomato', code: '1000' },
]

export default function CategorySelector() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentCategory = searchParams.get('category') ?? '400'

  const [isFixed, setIsFixed] = useState(false)
  const [show, setShow] = useState(true)
  const markerRef = useRef<HTMLDivElement | null>(null)
  const lastScrollY = useRef(0)
  const fixedThreshold = 140 // 스크롤 기준 높이

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      // 고정 여부 업데이트
      if (markerRef.current) {
        const markerTop =
          markerRef.current.getBoundingClientRect().top + window.scrollY
        setIsFixed(currentY >= markerTop + fixedThreshold)
      }

      // 스크롤 방향 감지
      if (currentY > 200) {
        setShow(currentY < lastScrollY.current)
      } else {
        setShow(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSelect = (code: string) => {
    router.push(`?category=${code}`)
  }

  const renderCategoryButtons = () => (
    <div className="flex space-x-1.5 py-2 bg-white overflow-x-auto scrollbar-hide">
      {categories.map(cat => {
        const isActive = cat.code === currentCategory
        return (
          <button
            key={cat.code}
            onClick={() => handleSelect(cat.code)}
            className="w-15 flex-shrink-0 flex flex-col items-center justify-center focus:outline-none cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                isActive
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-100'
              }`}
            >
              <Image
                src={`/icons/categories/${cat.emoji}.svg`}
                alt={cat.name}
                width={27.43}
                height={27.43}
              />
            </div>
            <span
              className={`mt-2 text-[13px] font-medium whitespace-nowrap ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {cat.name}
            </span>
          </button>
        )
      })}
    </div>
  )

  return (
    <>
      <div ref={markerRef} className="h-0" />

      {/* static */}
      {!isFixed && <div>{renderCategoryButtons()}</div>}

      {/* fixed */}
      {isFixed && (
        <div
          className={`fixed top-[48px] z-30 w-full max-w-[425px] mx-auto transition-transform duration-300 ease-in-out ${
            show ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div>{renderCategoryButtons()}</div>
        </div>
      )}
    </>
  )
}
