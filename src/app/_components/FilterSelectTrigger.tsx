import { ChevronDown } from 'lucide-react';

interface FilterSelectTriggerProps {
  label: string;
  onClick: () => void;
}

export default function FilterSelectTrigger({ label, onClick }: FilterSelectTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between px-2 py-[6px] rounded-full border border-gray-300 bg-white min-w-[80px] text-sm text-gray-900 font-medium"
    >
      <span>{label}</span>
      <ChevronDown size={14} className="ml-1 text-gray-400" />
    </button>
  );
}