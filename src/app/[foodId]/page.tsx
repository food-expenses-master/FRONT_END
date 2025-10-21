'use client'

import { use, useEffect, useState } from 'react'
import InfoBottomSheet from '../_components/InfoBottomSheet'
import { foodDetail } from '../api/food'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { getFormattedTime } from '@/data/utils'

type foodDetailData = {
  category: string
  item_name: string
  rank: string
  unit: string
  sales_region: string
  retail_day: string
  retail_price: number
  retail_price_change_rate: string
  wholesale_day: string
  wholesale_price: number
  wholesale_price_change_rate: string
  recommended_store: recommentedStore[]
}

type recommentedStore = {
  image: string
  name: string
  business_info: string
  number: string
  address: string
  address_link: string
}

export default function FoodDetailPage({
  params,
}: {
  params: Promise<{ foodId: string }>
}) {
  const { foodId } = use(params)
  const [data, setData] = useState<foodDetailData | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [infoTitle, setInfoTitle] = useState('')
  const [infoIcon, setInfoIcon] = useState('')
  const [infoData, setInfoData] = useState<{ text: string; link?: string }[]>(
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await foodDetail(foodId)
        setData(res?.data ?? null)
      } catch (error) {
        console.error('[Fetch Error]', error)
      }
    }

    if (foodId) fetchData()
  }, [foodId])

  const handleInfoClick = (
    type: 'call' | 'location',
    info: string,
    link: string | null = null
  ) => {
    setInfoTitle(type === 'call' ? '전화번호' : '위치')
    setInfoIcon(type)
    setInfoData([{ text: info, link: link ?? undefined }])
    setShowInfo(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white z-40 border-gray-200">
        <div className="max-w-[425px] mx-auto px-4 py-3.5 flex items-center justify-center gap-2 relative">
          <button
            onClick={() => history.back()}
            className="absolute left-4 cursor-pointer"
          >
            <ChevronLeft size={24} className={'text-gray-800'} />
          </button>
          <h1 className="text-base font-bold text-gray-900 leading-none">
            재료 상세
          </h1>
        </div>
      </header>
      {data && (
        <div className="-mx-4 bg-[#F2F6FB] px-4 pt-8 min-h-[calc(100vh-3rem)]">
          <h1 className="text-xl font-bold mb-1">
            {data.item_name}({data.rank})
          </h1>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">
              <span className="text-[#3271F9]">
                {data.wholesale_price > data.retail_price ? '도매' : '소매'}가격
              </span>
              이 제일 저렴해요!
            </h2>
            <p className="text-[0.6875rem] text-[#959ba7] font-medium">
              {getFormattedTime()} 기준
            </p>
          </div>
          <div className="space-y-2 pb-8">
            <PriceItem
              sellerType="도매가격"
              price={data.wholesale_price}
              priceChangeRate={data.wholesale_price_change_rate}
              info={`${data.rank} · ${data.unit} · ${data.wholesale_day.replace(
                ' · ',
                ''
              )}`}
              iconSrc="wholesale"
            />
            <PriceItem
              sellerType="소매가격"
              price={data.retail_price}
              priceChangeRate={data.retail_price_change_rate}
              info={`${data.rank} · ${data.unit} · ${data.retail_day.replace(
                ' · ',
                ''
              )}`}
              iconSrc="retail"
            />
            {(['전통시장', '쿠팡', '컬리'] as const).map(seller => (
              <PriceItem
                key={seller}
                sellerType={seller}
                price={0}
                priceChangeRate={''}
                info={''}
                iconSrc={
                  {
                    전통시장: 'traditional-market',
                    컬리: 'kurly',
                    쿠팡: 'coupang',
                  }[seller]
                }
              />
            ))}
          </div>

          {/* recoommend store */}
          {data.recommended_store.length > 0 && (
            <>
              <div className="-mx-4 px-4 py-8 bg-white">
                <h1 className="text-lg font-bold">
                  <span className="text-[#3271F9]">청량전통시장</span> 이 가게
                  어때요?
                </h1>
                <div className="mt-4 flex space-x-1.5  overflow-x-auto scrollbar-hide">
                  {data.recommended_store.map(item => (
                    <div key={item.name} className="flex-shrink-0">
                      <Image
                        src={item.image || '/icons/store-default.svg'}
                        alt="store thumbnail"
                        width={180}
                        height={100}
                        className="rounded-lg w-45 h-25"
                      />
                      <div className="mt-2 text-base font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="mt-0.5 text-[13px] font-normal text-[#69707A]">
                        {item.business_info}
                      </div>
                      <div className="mt-5 flex items-center space-x-3">
                        {(['call', 'location'] as const).map(icon => {
                          const handleClick = () => {
                            if (icon === 'call')
                              handleInfoClick('call', item.number)
                            else if (icon === 'location')
                              handleInfoClick(
                                'location',
                                item.address,
                                item.address_link
                              )
                          }

                          return (
                            <div
                              key={icon}
                              className="p-2 bg-[#F2F6FB] rounded-full cursor-pointer"
                              onClick={handleClick}
                            >
                              <Image
                                src={`/icons/${icon}.svg`}
                                alt={icon}
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <InfoBottomSheet
                visible={showInfo}
                onClose={() => setShowInfo(false)}
                InfoDatas={infoData}
                title={infoTitle}
                icon={infoIcon}
              />
            </>
          )}
        </div>
      )}
    </>
  )
}

type PriceItemProps = {
  sellerType: string
  price: number
  priceChangeRate: string
  info: string
  iconSrc: string
}
const PriceItem = ({
  sellerType,
  price,
  priceChangeRate,
  info,
  iconSrc,
}: PriceItemProps) => {
  const rate = parseFloat(priceChangeRate)
  const isUp = rate !== null && rate > 0
  const isDown = rate !== null && rate < 0
  const icon = isUp ? 'up' : isDown ? 'down' : ''

  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-xl">
      <div className="flex items-center space-x-3">
        <Image
          src={`/icons/${iconSrc}.svg`}
          alt="storeicon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <div className={`${info ? 'space-y-1' : ''}`}>
          <div className="text-base font-medium text-gray-900 flex items-center">
            {sellerType}
          </div>
          <div className="text-[13px] text-gray-400">{info}</div>
        </div>
      </div>
      <div className="text-right">
        {sellerType !== '도매가격' && sellerType !== '소매가격' ? (
          <span className="text-[#959BA6] font-normal text-[13px]">
            Coming Soon!
          </span>
        ) : (
          <>
            <div
              className={`text-base font-medium ${
                price ? 'text-gray-900' : 'text-gray-400'
              } mb-1`}
            >
              {price ? price.toLocaleString() + '원' : '-'}
            </div>
            <div
              className={`text-[13px] font-medium flex justify-end ${
                isUp
                  ? 'text-red-500'
                  : isDown
                  ? 'text-blue-600'
                  : 'text-gray-400'
              }`}
            >
              {isUp || isDown ? (
                <>
                  {priceChangeRate}
                  <Image
                    src={`/icons/${icon}.svg`}
                    alt={icon}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </>
              ) : (
                '-'
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
