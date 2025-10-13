export const foodList = async (
  category?: string,
  region?: string,
  saleType?: string
) => {
  try {
    const params = new URLSearchParams()

    if (category) params.append('category', category)
    if (region) params.append('region', region)
    if (saleType) params.append('sales_type', saleType)

    const queryString = params.toString()
    const url = `${process.env.NEXT_PUBLIC_API_URL}foods${
      queryString ? `?${queryString}` : ''
    }`

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    return await res.json()
  } catch (error) {
    console.error('[error]:', error)
    throw error
  }
}

export const foodDetail = async (foodId: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}foods/${foodId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(res)
    return await res.json()
  } catch (error) {
    console.error('[error]:', error)
    throw error
  }
}
