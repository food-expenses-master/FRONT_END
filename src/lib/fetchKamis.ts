export async function fetchKamisDailyPrice(category?: string) {
  const certKey = process.env.KAMIS_CERT_KEY;
  const certId = process.env.KAMIS_CERT_ID;

  const today = new Date().toISOString().slice(0, 10);

  const url = `http://www.kamis.or.kr/service/price/xml.do` +
              `?action=dailyPriceByCategoryList` +
              `&p_returntype=json` +
              `&p_cert_key=${certKey}` +
              `&p_cert_id=${certId}` +
              `&p_product_cls_code=02` +
              `&p_item_category_code=${category}` +
              `&p_regday=${today}` +
              `&p_convert_kg_yn=Y`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[Kamis Fetch Error]', error);
    throw error;
  }
}