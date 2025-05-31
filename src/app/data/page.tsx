import { fetchKamisDailyPrice } from '@/lib/fetchKamis'
import MainPageClient from '../_components/MainPageClient'
import Header from '../_components/Header'

export default async function Page({ searchParams }: { searchParams: any }) {
  const category = searchParams?.category ?? '400'
  const region = searchParams?.region ?? ''
  const kamisData = await fetchKamisDailyPrice(category, region)

  console.log(kamisData)

  return (
    <>
      <Header title={'재료 시세'} />
      <MainPageClient data={kamisData?.data?.item ?? []} />;
    </>
  )
}
