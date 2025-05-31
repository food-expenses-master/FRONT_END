'use client';

import { KamisPriceData, regionOptions, sellerOptions } from '@/data/types';
import { useState } from 'react';
import CategorySelector from './CategorySelector';
import SortSelector from './SortSelector';
import { getDisplayName } from '@/data/utils';
import BottomNav from './BottomNav';
import FilterBottomSheet, { FilterOption } from './FilterBottomSheet';
import FilterSelectTrigger from './FilterSelectTrigger';
import SearchBar from './SearchBar';


type Props = {
  data: KamisPriceData[];
};

export default function MainPageClient({ data }: Props) {
  const [sortKey, setSortKey] = useState('price_asc');
  const [query, setQuery] = useState('');

  const [showFilter, setShowFilter] = useState(false);

  const [region, setRegion] = useState<string | null>(null);
  const [seller, setSeller] = useState<string | null>(null);

  const regionLabel = regionOptions.find((r) => r.id === region)?.label ?? '지역';
  const sellerLabel = sellerOptions.find((s) => s.id === seller)?.label ?? '판매처';

  const sorted = sortData(
    data.filter((item) => item.rank !== '중품'),
    sortKey
  );

  return (
    <div className="bg-white">
      <div className="w-full max-w-[425px] mx-auto px-4 overflow-y-scroll pb-[100px]">
            <div className="flex items-end justify-between px-4 pt-6 pb-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl font-extrabold text-gray-900 leading-none">
          {"재료 시세"}
        </h1>
        {/* <span className="text-sm text-gray-400 leading-none">{''} 기준</span> */}
      </div>
    </div>


<SearchBar value={query} onChange={setQuery} />
      <CategorySelector />

<div className="flex gap-2 px-4 py-2 border-t">
  <FilterSelectTrigger label={regionLabel} onClick={() => setShowFilter(true)} />
  <FilterSelectTrigger label={sellerLabel} onClick={() => setShowFilter(true)} />
</div>

      {/* 바텀시트 필터 */}
      <FilterBottomSheet
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        regionOptions={regionOptions}
        sellerOptions={sellerOptions}
        selectedRegion={region}
        selectedSeller={seller}
        setSelectedRegion={setRegion}
        setSelectedSeller={setSeller}
      />


        <div className="w-full max-w-[425px] mx-auto px-4 py-3 flex justify-between items-center text-sm">
          <div className="text-gray-400">
            전체 <span className="text-gray-600 font-medium">{sorted.length}</span>
          </div>
          <div className="flex items-center text-gray-800 font-medium space-x-1">
            <SortSelector onChange={setSortKey} />
          </div>
        </div>



        {sorted.map((item, idx) => {
          const displayPrice = item.dpr1 !== '-' ? item.dpr1 : item.dpr2 ?? '-';

          const [recent, prev] = [item.dpr1, item.dpr2]
            .map(parsePrice)
            .filter((n): n is number => n !== null);

          const rate =
            recent !== undefined && prev !== undefined && prev !== 0
              ? ((recent - prev) / prev) * 100
              : null;

          const isUp = rate !== null && rate > 0;
          const isDown = rate !== null && rate < 0;
          const rateText =
            rate !== null
              ? `${isUp ? '+' : isDown ? '-' : ''}${Math.abs(rate).toFixed(2)}%`
              : '-';
          const icon = isUp ? '▲' : isDown ? '▼' : '';

          return (
            <div key={idx} className="flex items-center justify-between py-4 px-2">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 accent-gray-400" />
                <div>
                  <div className="text-[15px] font-semibold text-gray-900">
                    {getDisplayName(item.item_name, item.kind_name)}
                  </div>
                  <div className="text-[13px] text-gray-400">유통업체 · 상품 · 1kg</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-gray-900">{displayPrice}원</div>
                <div
                  className={`text-[13px] font-medium ${
                    isUp ? 'text-red-500' : isDown ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {rateText} {icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}

function parsePrice(value: string): number | null {
  if (!value || value === '-' || isNaN(Number(value.replace(/,/g, '')))) return null;
  return parseInt(value.replace(/,/g, ''), 10);
}

function sortData(data: KamisPriceData[], sortKey: string): KamisPriceData[] {
  const parsePrice = (val: string): number => {
    const num = parseInt(val?.replace(/,/g, '') || '', 10);
    return isNaN(num) ? Infinity : num; // '-' → Infinity로 처리해 맨 뒤로 보냄
  };

  const compareRate = (item: KamisPriceData) => {
    const today = parsePrice(item.dpr1);
    const yesterday = parsePrice(item.dpr2);
    return yesterday ? ((today - yesterday) / yesterday) * 100 : 0;
  };

  const normalizeName = (name: string) =>
    name.replace(/\([^)]*\)/g, '').replace(/\s+/g, '').toLowerCase();

  switch (sortKey) {
    case 'price_asc':
      return [...data].sort((a, b) => parsePrice(a.dpr1) - parsePrice(b.dpr1));
    case 'price_desc':
      return [...data].sort((a, b) => parsePrice(b.dpr1) - parsePrice(a.dpr1));
    case 'name_asc':
      return [...data].sort(
        (a, b) => normalizeName(a.item_name).localeCompare(normalizeName(b.item_name))
      );
    case 'drop_desc':
      return [...data].sort((a, b) => compareRate(a) - compareRate(b));
    case 'rise_desc':
      return [...data].sort((a, b) => compareRate(b) - compareRate(a));
    default:
      return data;
  }
}