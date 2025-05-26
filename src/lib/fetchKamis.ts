export async function fetchKamisDailyPrice() {
  const certKey = process.env.KAMIS_CERT_KEY;
  const certId = process.env.KAMIS_CERT_ID;

  const url = `http://www.kamis.or.kr/service/price/xml.do` +
              `?action=dailyPriceByCategoryList` +
              `&p_returntype=json` +
              `&p_cert_key=${certKey}` +
              `&p_cert_id=${certId}` +
              `&p_product_cls_code=02` +
              `&p_category_code=100` +
              `&p_item_code=${"100"}` +
              `&p_regday=${"2025-05-27"}` +
              `&p_convert_kg_yn=N`;

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