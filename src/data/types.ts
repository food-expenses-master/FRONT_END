import { FilterOption } from '@/app/_components/FilterBottomSheet'

export type KamisPriceData = {
  item_name: string
  item_code: string
  kind_name: string
  kind_code: string
  rank: string
  rank_code: string
  unit: string
  day1: string
  dpr1: string
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

export const regionOptions: FilterOption[] = [
  { id: '0000', label: '전체' },
  { id: '1101', label: '서울' },
  { id: '2100', label: '부산' },
  { id: '2200', label: '대구' },
  { id: '2300', label: '인천' },
  { id: '2401', label: '광주' },
  { id: '2501', label: '대전' },
  { id: '2601', label: '울산' },
  { id: '3111', label: '수원' },
  { id: '3214', label: '강릉' },
  { id: '3211', label: '춘천' },
  { id: '3311', label: '청주' },
  { id: '3511', label: '전주' },
  { id: '3711', label: '포항' },
  { id: '3911', label: '제주' },
  { id: '3113', label: '의정부' },
  { id: '3613', label: '순천' },
  { id: '3714', label: '안동' },
  { id: '3814', label: '창원' },
  { id: '3145', label: '용인' },
  { id: '2701', label: '세종' },
  { id: '3112', label: '성남' },
  { id: '3138', label: '고양' },
  { id: '3411', label: '천안' },
  { id: '3818', label: '김해' },
]

export const sellerOptions: FilterOption[] = [
  { id: '전체', label: '전체' },
  { id: '도매', label: '도매' },
  { id: '소매', label: '소매' },
  { id: 'traditional', label: '전통시장', disabled: true },
  { id: 'online1', label: '쿠팡', disabled: true },
  { id: 'online2', label: '컬리', disabled: true },
]

export const InfoDatas = [
  '식재료 가격은 매일 정해진 시간에 업데이트돼요.',
  '오늘 데이터가 없는 경우에는, 일주일 전 → 한 달 전 순서로 보여드려요.',
  '각 식재료 리스트에 표시된 날짜는, 해당 데이터가 수집된 기준일이에요.',
]
