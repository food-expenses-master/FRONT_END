export const foodList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}foods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

    console.log(res)
  } catch (error) {
    console.error('1 error:', error)
    throw error
  }
}
export const foodDetail = async (foodId: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/foods/${foodId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(res)
  } catch (error) {
    console.error('1 error:', error)
    throw error
  }
}
