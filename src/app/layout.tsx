import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import BottomNav from './_components/BottomNav'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const FOOD_EXPENSES_URL = new URL(
  'https://food-expenses-master-4ffx.vercel.app/'
)
const title = '식품마스터'
const description = '사회초년생들을 위한 식품관리 앱'

export const metadata: Metadata = {
  metadataBase: FOOD_EXPENSES_URL,
  title,
  description,
  keywords: ' ',
  formatDetection: { telephone: false },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: FOOD_EXPENSES_URL,
    title,
    description,
    siteName: 'FoodExpenses',
    images: [
      {
        url: '',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full max-w-[425px] mx-auto mt-[60px] py-6 px-4 antialiased bg-white text-black`}
      >
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
