import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ placeholder = '식재료를 검색해보세요', value, onChange }: SearchBarProps) {
  return (
    <div className="w-full max-w-[425px] px-4 pb-4">
      <div className="flex items-center px-4 py-3 rounded-full bg-gray-100">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        />
        <Search size={20} className="text-gray-700" />
      </div>
    </div>
  );
}
