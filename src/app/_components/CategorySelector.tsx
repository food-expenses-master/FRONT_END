'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { name: '과일', emoji: '🍎' ,code: '400' },
  { name: '채소·배추류', emoji: '🥦' ,code: '200'},
  { name: '고기·단백질', emoji: '🥩' , code: '500'},
  { name: '곡물·견과', emoji: '🌾', code: '100' },
];

export default function CategorySelector() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 현재 URL의 category param 읽기
  const currentCategory = searchParams.get('category') ?? '400';

  const handleSelect = (code: string) => {
    router.push(`?category=${code}`);
  };

  return (
    <div className="w-full max-w-[425px] mx-auto px-4 overflow-x-auto">
      <div className="flex space-x-4 py-2">
    {categories.map((cat) => {
          const isActive = cat.code === currentCategory;

          return (
            <button
              key={cat.code}
              onClick={() => handleSelect(cat.code)}
              className="flex flex-col items-center justify-center focus:outline-none cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl 
                ${isActive ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}
              `}
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
          );
        })}
      </div>
    </div>
  );
}