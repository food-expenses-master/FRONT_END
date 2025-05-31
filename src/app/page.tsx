import { fetchKamisDailyPrice } from "@/lib/fetchKamis";
import MainPageClient from "./_components/MainPageClient";

export default async function Page({ searchParams }: { searchParams: any}) {
  const category = searchParams?.category ?? '400';
  const kamisData = await fetchKamisDailyPrice(category);

  return <MainPageClient data={kamisData?.data?.item ?? []} />;
}