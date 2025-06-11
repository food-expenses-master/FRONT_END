export default function Head() {
  return (
    <>
      {/* PWA 매니페스트 */}
      <link rel="manifest" href="/manifest.json" />
      {/* 파비콘 */}
      <link rel="icon" href="/icons/icon-192x192.png" />
      {/* 테마 컬러 */}
      <meta name="theme-color" content="#317EFB" />
      {/* iOS 홈화면 아이콘 */}
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </>
  )
}

//	•	public/icons/icon-192x192.png
//	•	public/icons/icon-512x512.png
