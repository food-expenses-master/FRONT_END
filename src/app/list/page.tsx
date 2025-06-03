'use client'

import { useState, useRef } from 'react'
import Header from '../_components/Header'
import { AnimatePresence, motion } from 'framer-motion'

export default function ListPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const backdropRef = useRef(null)

  const isFormValid = itemName.trim() && price.trim()

  const closeModal = () => setShowAddModal(false)

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      closeModal()
    }
  }

  return (
    <main>
      <Header title="장리스트" />
      <p className="text-gray-600 text-sm">
        필요한 식재료를 체크하고 비교하세요.
      </p>

      <div className="flex justify-between px-4 pt-6 pb-2 bg-white z-40">
        <span className="text-gray-400">전체</span>
        <div className="text-sm text-right space-x-2">
          <button onClick={() => setShowAddModal(true)} className="text-black">
            추가
          </button>
          <span className="text-gray-400">|</span>
          <button className="text-black">삭제</button>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
            ref={backdropRef}
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-[425px] rounded-t-2xl p-6"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-extrabold">리스트 항목 추가</h2>
                <button onClick={closeModal} className="text-gray-500 text-2xl">
                  ×
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-sm">식재료명</p>
                <input
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  className="text-black text-sm font-medium w-full border-b border-gray-300 outline-none py-2"
                  placeholder="식재료명을 입력하세요"
                />
              </div>

              <div className="mb-4">
                <label className="flex justify-between text-gray-400 text-sm border-b py-3 items-center">
                  가격
                  <input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="text-right text-black outline-none flex-1"
                    placeholder="가격을 입력하세요"
                  />
                  <span className="ml-1">원</span>
                </label>
              </div>

              {/* <div className="mb-6">
                <label className="flex justify-between text-gray-400 text-sm border-b py-3 items-center">
                  수량
                  <input
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="text-right text-black outline-none flex-1"
                    placeholder="수량 및 단위를 입력하세요"
                  />
                </label>
              </div> */}

              <button
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl text-center font-semibold text-lg transition-colors duration-300
                  ${
                    isFormValid
                      ? 'bg-[#2F76FF] text-white'
                      : 'bg-gray-300 text-white'
                  }`}
              >
                추가하기 +
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
