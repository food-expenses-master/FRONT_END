import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface SearchBarProps {
  // data: { item_name: string; kind_name: string }[]
  onQueryChange: (query: string) => void
}

export default function SearchBar({ onQueryChange }: SearchBarProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    onQueryChange(query)
  }, [query, onQueryChange])

  return (
    <div className="w-full max-w-[425px] py-2">
      <div className="flex items-center px-4 py-3 rounded-full bg-gray-100">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="식재료를 검색해보세요"
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        />
        <div className="flex items-center gap-2">
          {query && (
            <Image
              onClick={() => setQuery('')}
              className="cursor-pointer"
              src="/icons/close.svg"
              alt="search-image"
              width={16}
              height={16}
            />
          )}
          <Search
            size={20}
            className={`${query ? 'text-[#3171f9]' : 'text-gray-700'}`}
          />
        </div>
      </div>
    </div>
  )
}
