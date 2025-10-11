'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

type InfoBottomSheetProps = {
  visible: boolean
  onClose: () => void
  InfoDatas: string[]
}

export default function InfoBottomSheet({
  visible,
  onClose,
  InfoDatas,
}: InfoBottomSheetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.15 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-w-[425px] mx-auto flex flex-col"
          >
            <div
              ref={wrapperRef}
              className="flex flex-col flex-1 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 pb-0 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  가격 데이터 업데이트
                </h2>
                <button onClick={onClose} className="text-gray-400">
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                {InfoDatas.map((data, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-4 mb-2 rounded-lg bg-[#F2F6FB] font-normal text-sm"
                  >
                    <Image
                      src="/icons/check.svg"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    {data}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
