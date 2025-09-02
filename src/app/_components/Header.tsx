'use client'

export default function Header({ title }: { title: string }) {
  const now = new Date()
  const formattedTime = `${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(now.getDate()).padStart(2, '0')}.${String(
    now.getHours()
  ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

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
