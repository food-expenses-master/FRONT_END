'use client'

import Image from 'next/image'
import { getFormattedTime } from '@/data/utils'
import { useEffect, useState } from 'react'

interface HeaderProps {
  title: string
  iconSrc?: string
  onClick?: () => void
}

export default function Header({ title, iconSrc, onClick }: HeaderProps) {
  const [now, setNow] = useState<string | undefined>()

  useEffect(() => setNow(new Date().toISOString()), [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40 border-gray-200">
      <div className="max-w-[425px] mx-auto px-4 h-12 flex items-center justify-start gap-2">
        <h1 className="text-lg font-bold text-gray-900 leading-none">
          {title}
        </h1>
        <div className="flex items-center gap-1">
          <time
            className="text-[0.6875rem] text-[#959ba7] font-medium"
            dateTime={now}
          >
            {getFormattedTime()} 기준
          </time>
          {iconSrc && (
            <button onClick={onClick}>
              <Image src={iconSrc} alt="Info" width={12} height={12} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
