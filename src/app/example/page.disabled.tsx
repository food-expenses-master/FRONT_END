import { fetchKamisDailyPrice } from '@/lib/fetchKamis'
import CategorySelector from '../_components/CategorySelector'

export type KamisPriceData = {
  item_name: string // 품목명 예: '녹두'
  item_code: string // 품목코드 예: '143'
  kind_name: string // 품종명 예: '수입(40kg)'
  kind_code: string // 품종코드 예: '01'
  rank: string // 등급 예: '중품'
  rank_code: string // 등급코드 예: '05'
  unit: string // 단위 예: '40kg'

  day1: string // 날짜1 레이블 예: '당일 (05/27)'
  dpr1: string // 가격1 예: '-', '219,600'

  day2: string
  dpr2: string

  day3: string
  dpr3: string

  day4: string
  dpr4: string

  day5: string
  dpr5: string

  day6: string
  dpr6: string

  day7: string
  dpr7: string
}

export default async function DataPage({ searchParams }: any) {
  const category = searchParams?.category ?? '400'

  const kamisData = await fetchKamisDailyPrice(category, '')
  const dataList: KamisPriceData[] = kamisData?.data?.item ?? []
  const conditionList: Record<string, any>[] = kamisData?.condition ?? []

  return (
    <>
      <CategorySelector />

      <div className="w-full max-w-[425px] mx-auto px-4">
        {/* 🔵 조건 정보 출력 */}
        {conditionList.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              요청 조건 (condition)
            </h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              {Object.entries(conditionList[0]).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}</span>:{' '}
                  <span className="text-gray-900">{String(value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 🟢 시세 데이터 리스트 출력 */}
        {dataList.map((item, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow-sm">
            <h3 className="text-base font-semibold">
              {item.item_name} {item.kind_name}
            </h3>
            <p className="text-sm text-gray-500">
              등급: {item.rank} | 단위: {item.unit}
            </p>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              <li>
                {item.day1}: {item.dpr1}
              </li>
              <li>
                {item.day2}: {item.dpr2}
              </li>
              <li>
                {item.day3}: {item.dpr3}
              </li>
              <li>
                {item.day4}: {item.dpr4}
              </li>
              <li>
                {item.day5}: {item.dpr5}
              </li>
              <li>
                {item.day6}: {item.dpr6}
              </li>
              <li>
                {item.day7}: {item.dpr7}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
