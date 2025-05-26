'use client';

import { Home, ShoppingCart, Search, User } from 'lucide-react';

const navItems = [
  { label: '홈', icon: <Home size={22} />, active: true },
  { label: '장리스트', icon: <ShoppingCart size={22} />, active: false },
  { label: '시세', icon: <Search size={22} />, active: false },
  { label: 'MY', icon: <User size={22} />, active: false },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-[425px] mx-auto px-6 py-2 flex justify-between text-xs">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center text-center flex-1"
          >
            <div className={item.active ? 'text-black' : 'text-gray-400'}>
              {item.icon}
            </div>
            <span
              className={`mt-1 ${
                item.active ? 'text-black font-medium' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}