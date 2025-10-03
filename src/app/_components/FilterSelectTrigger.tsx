import { ChevronDown } from 'lucide-react'

interface FilterSelectTriggerProps {
  label: string
  active?: boolean
  onClick: () => void
}

export default function FilterSelectTrigger({
  label,
  active = false,
  onClick,
}: FilterSelectTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-[10px] py-1 rounded-full border text-sm min-w-[88px] transition-all duration-200
        ${
          active
            ? 'bg-white border-blue-500 text-blue-500'
            : 'bg-white border-gray-300 text-gray-900'
        }`}
    >
      <span>{label}</span>
      <ChevronDown
        size={16}
        className={active ? 'text-blue-500 ml-1' : 'text-gray-400 ml-1'}
      />
    </button>
  )
}
