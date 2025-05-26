import { fetchKamisDailyPrice } from "@/lib/fetchKamis";
import BottomNav from "./_components/BottomNav";
import CategorySelector from "./_components/CategorySelector";

export type KamisPriceData = {
  item_name: string;        // 품목명 예: '녹두'
  item_code: string;        // 품목코드 예: '143'
  kind_name: string;        // 품종명 예: '수입(40kg)'
  kind_code: string;        // 품종코드 예: '01'
  rank: string;             // 등급 예: '중품'
  rank_code: string;        // 등급코드 예: '05'
  unit: string;             // 단위 예: '40kg'

  day1: string;             // 날짜1 레이블 예: '당일 (05/27)'
  dpr1: string;             // 가격1 예: '-', '219,600'

  day2: string;
  dpr2: string;

  day3: string;
  dpr3: string;

  day4: string;
  dpr4: string;

  day5: string;
  dpr5: string;

  day6: string;
  dpr6: string;

  day7: string;
  dpr7: string;
};

export default async function HomePage({ searchParams }: any) {
  const category = searchParams?.category ?? '400';
  const kamisData = await fetchKamisDailyPrice(category);
  const priceItems: KamisPriceData[] = kamisData.data.item
  
  return (
    <div className="bg-white">
      {/* <KamisClientView kamisData={kamisData}/> */}
      <CategorySelector/>
        <div className="w-full max-w-[425px] mx-auto px-4 overflow-y-scroll pb-[100px]">
              <div className="w-full max-w-[425px] mx-auto px-4 py-3 flex justify-between items-center text-sm">
      {/* 왼쪽: 전체 개수 */}
      <div className="text-gray-400">
        전체 <span className="text-gray-600 font-medium">{priceItems.length}</span>
      </div>

      {/* 오른쪽: 정렬 기준 */}
      <div className="flex items-center text-gray-800 font-medium space-x-1">
        <span>순</span>
        <span className="text-gray-400 text-[16px] leading-none">≡</span>
      </div>
    </div>
 {priceItems.map((item, idx) => {
        // 가격 비교용 기준 설정
    const prices: { label: string; value: number | null }[] = [
            { label: item.day1, value: parsePrice(item.dpr1) },
            { label: item.day2, value: parsePrice(item.dpr2) },
            { label: item.day3, value: parsePrice(item.dpr3) },
          ];

          // 유효한 숫자 가격만 추출
          const validPrices = prices.filter((p) => p.value !== null);

          // 최근 2개 값으로 비교
          const [recent, prev] = validPrices;

          const diff =
            recent && prev ? (recent.value as number) - (prev.value as number) : null;

          const rate =
            recent && prev && prev.value
              ? ((recent.value! - prev.value!) / prev.value!) * 100
              : null;

          const isUp = diff !== null && diff > 0;
          const isDown = diff !== null && diff < 0;


        const rateText =
          rate !== null
            ? `${isUp ? '+' : isDown ? '-' : ''}${Math.abs(rate).toFixed(2)}%`
            : '-';
        const icon = isUp ? '▲' : isDown ? '▼' : '';

        // 화면에 보여줄 가격은 가능한 최신 값 사용
        const displayPrice =
          item.dpr1 && item.dpr1 !== '-' ? item.dpr1 : item.dpr2 ?? '-';

        return (
          <div key={idx} className="flex items-center justify-between py-4 px-2 ">
            {/* 좌측 */}
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 accent-gray-400" />
              <div>
                <div className="text-[15px] font-semibold text-gray-900">
                  {item.item_name} {item.kind_name}
                </div>
                <div className="text-[13px] text-gray-400">
                  유통업체 · 상품 · {item.unit}
                </div>
              </div>
            </div>

            {/* 우측 */}
            <div className="text-right">
              <div className="text-[15px] font-semibold text-gray-900">
                {displayPrice}원
              </div>
              <div
                className={`text-[13px] font-medium ${
                  isUp
                    ? 'text-red-500'
                    : isDown
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                {rateText} {icon}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    <BottomNav/>
    </div>
  );
}

function parsePrice(value: string): number | null {
  if (!value || value === '-' || isNaN(Number(value.replace(/,/g, '')))) {
    return null;
  }
  return parseInt(value.replace(/,/g, ''), 10);
}