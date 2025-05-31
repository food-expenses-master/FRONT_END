import { useEffect, useState } from 'react'

export function useScrollInfo(threshold = 10) {
  const [scrollY, setScrollY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY
      if (Math.abs(delta) > threshold) {
        setDirection(delta > 0 ? 'down' : 'up')
        setScrollY(currentY)
        lastY = currentY
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { scrollY, direction }
}
