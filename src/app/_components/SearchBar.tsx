// src/components/SearchBar.tsx

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  data: { item_name: string; kind_name: string }[];
  onQueryChange: (query: string) => void;
}

export default function SearchBar({ data, onQueryChange }: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onQueryChange(query);
  }, [query, onQueryChange]);

  return (
    <div className="w-full max-w-[425px] pb-4">
      <div className="flex items-center px-4 py-3 rounded-full bg-gray-100">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="식재료를 검색해보세요"
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        />
        <Search size={20} className="text-gray-700" />
      </div>
    </div>
  );
}