'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '../_components/Header'
import { AnimatePresence, motion } from 'framer-motion'

type Item = {
  name: string
  price: string
}

export default function ListPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [shoppingList, setShoppingList] = useState<Item[]>([])
  const [deleteMode, setDeleteMode] = useState(false)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const backdropRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('shoppingList')
    if (saved) setShoppingList(JSON.parse(saved))
  }, [])

  const handleAddItem = () => {
    if (!itemName.trim() || !price.trim()) return
    const updated = [...shoppingList, { name: itemName, price }]
    setShoppingList(updated)
    localStorage.setItem('shoppingList', JSON.stringify(updated))
    setItemName('')
    setPrice('')
    setShowAddModal(false)
  }

  const toggleDeleteMode = () => {
    setDeleteMode(prev => !prev)
    setSelected(new Set())
  }

  const toggleSelect = (i: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === shoppingList.length) setSelected(new Set())
    else setSelected(new Set(shoppingList.map((_, i) => i)))
  }

  const handleDelete = () => {
    const remaining = shoppingList.filter((_, i) => !selected.has(i))
    setShoppingList(remaining)
    localStorage.setItem('shoppingList', JSON.stringify(remaining))
    setSelected(new Set())
    setDeleteMode(false)
  }

  const isFormValid = itemName.trim() && price.trim()
  const closeModal = () => setShowAddModal(false)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) closeModal()
  }

  const total = shoppingList.reduce((sum, item, i) => {
    if (deleteMode && selected.has(i)) return sum
    const val = parseInt(item.price.replace(/,/g, ''), 10)
    return sum + (isNaN(val) ? 0 : val)
  }, 0)

  return (
    <main>
      {/* 헤더 + 툴바 */}
      <Header title="장보기 리스트" />
      <div className="flex justify-between px-4 pt-6 pb-2 bg-white z-40">
        <span className="text-gray-400">전체 {shoppingList.length}</span>
        <div className="text-sm space-x-2 cursor-pointer">
          <button onClick={() => setShowAddModal(true)} className="text-black">
            추가
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={toggleDeleteMode}
            className="text-black cursor-pointer"
          >
            {deleteMode ? '완료' : '삭제'}
          </button>
        </div>
      </div>

      {/* 삭제 모드 전용 상단 선택바 */}
      {deleteMode && (
        <div
          className="flex items-center px-4 py-2 text-sm text-[#2F76FF] font-medium"
          onClick={toggleSelectAll}
        >
          <div
            className={`w-5 h-5 mr-2 rounded border flex items-center justify-center ${
              selected.size === shoppingList.length
                ? 'bg-[#2F76FF] border-[#2F76FF]'
                : 'border-[#D9DDEB]'
            }`}
          >
            <svg
              className="w-3 h-3"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M5 13l4 4L19 7" className={'stroke-white'} />
            </svg>
          </div>
          전체 {selected.size === shoppingList.length ? '해제' : '선택'}
        </div>
      )}

      {/* 리스트 */}
      <div className="divide-y">
        {shoppingList.map((item, i) => {
          const selectedThis = selected.has(i)
          const isChecked = selectedThis
          const checkedClass =
            isChecked && deleteMode
              ? 'bg-[#2F76FF] border-[#2F76FF]'
              : isChecked
              ? 'bg-[#A4AFC3] border-[#A4AFC3]'
              : 'border-[#D9DDEB]'

          return (
            <div
              key={i}
              className="flex justify-between items-center px-4 py-4 border-t border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => toggleSelect(i)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center cursor-pointer ${checkedClass}`}
                >
                  <svg
                    className="w-4 h-4"
                    stroke="currentColor"
                    strokeWidth={3}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" className={'stroke-white'} />
                  </svg>
                </div>
                <div>
                  <div
                    className={`text-[15px] font-semibold ${
                      isChecked ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    유통업체 · 상품 · 1kg
                  </div>
                </div>
              </div>
              <div
                className={`text-[15px] font-semibold ${
                  isChecked ? 'line-through text-gray-400' : 'text-gray-900'
                }`}
              >
                {item.price}원
              </div>
            </div>
          )
        })}

        {/* 총액 */}
        <div className="border-t border-dashed mt-6 pt-4 px-4 flex justify-between items-center font-bold text-lg text-[#1C1C1E]">
          <span>총액</span>
          <span>
            {total.toLocaleString()}{' '}
            <span className="text-base font-medium">원</span>
          </span>
        </div>
      </div>

      {/* 삭제 동작 버튼 */}
      {deleteMode && selected.size > 0 && (
        <button
          onClick={handleDelete}
          className="fixed bottom-[60px] left-0 right-0 bg-[#2F76FF] text-white text-lg font-semibold py-4"
        >
          삭제
        </button>
      )}

      {/* 모달 */}
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
              <div className="mb-6">
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
              <button
                onClick={handleAddItem}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl text-center font-semibold text-lg transition-colors duration-300 ${
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
