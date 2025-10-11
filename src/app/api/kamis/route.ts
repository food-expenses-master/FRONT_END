import { fetchKamisDailyPrice } from '@/lib/fetchKamis'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') ?? '400'
  const region = searchParams.get('region') ?? ''

  const data = await fetchKamisDailyPrice(category, region)
  return Response.json(data)
}
