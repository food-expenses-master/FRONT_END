'use client'

export default function Header({ title }: { title: string }) {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const formattedTime = `${pad(now.getMonth() + 1)}.${pad(now.getDate())}.${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}`

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40 border-gray-200">
      <div className="max-w-[425px] mx-auto px-4 h-[60px] flex items-center justify-start gap-2">
        <h1 className="text-2xl font-bold text-gray-900 leading-none">
          {title}
        </h1>
        <time
          className="text-sm text-[#959ba7] font-semibold"
          dateTime={now.toISOString()}
        >
          {formattedTime} 기준
        </time>
      </div>
    </header>
  )
}
