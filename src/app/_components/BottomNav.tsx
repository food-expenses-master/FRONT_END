'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, ShoppingCart, Search, User } from 'lucide-react'

const navItems = [
  { label: '홈', icon: Home, href: '/' },
  { label: '장리스트', icon: ShoppingCart, href: '/list' },
  { label: '시세', icon: Search, href: '/data' },
  { label: 'MY', icon: User, href: '/my' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="max-w-[425px] mx-auto px-6 py-2 flex justify-between text-xs">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <button
              key={idx}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center justify-center text-center flex-1 cursor-pointer"
            >
              <div className={isActive ? 'text-black' : 'text-gray-400'}>
                <Icon
                  size={22}
                  className="transition-nav transition-nav-fast ease-nav-ease transform hover:scale-110"
                />
              </div>
              <span
                className={`mt-1 ${
                  isActive ? 'text-black font-medium' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
