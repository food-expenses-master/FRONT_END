import { fetchKamisDailyPrice } from "@/lib/fetchKamis";
import MainPageClient from "../_components/MainPageClient";

export default async function Page({ searchParams }: { searchParams: any}) {
  const category = searchParams?.category ?? '400';
  const region = searchParams?.region ?? '';
  const kamisData = await fetchKamisDailyPrice(category,region);

  console.log(kamisData);

  return <MainPageClient data={kamisData?.data?.item ?? []} />;
}