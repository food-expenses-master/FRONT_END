'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const categories = [
  { name: '과일', emoji: '🍎', code: '400' },
  { name: '채소·배추류', emoji: '🥦', code: '200' },
  { name: '고기·단백질', emoji: '🥩', code: '500' },
  { name: '곡물·견과', emoji: '🌾', code: '100' },
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
    <div className="flex space-x-4 py-2 bg-white">
      {categories.map(cat => {
        const isActive = cat.code === currentCategory
        return (
          <button
            key={cat.code}
            onClick={() => handleSelect(cat.code)}
            className="flex flex-col items-center justify-center focus:outline-none cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                isActive
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-100'
              }`}
            >
              {cat.emoji}
            </div>
            <span
              className={`mt-1 text-sm ${
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-400'
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
          className={`fixed top-[60px] z-30 w-full max-w-[425px] mx-auto transition-transform duration-300 ease-in-out ${
            show ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div>{renderCategoryButtons()}</div>
        </div>
      )}
    </>
  )
}
