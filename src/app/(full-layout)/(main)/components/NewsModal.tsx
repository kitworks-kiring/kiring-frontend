'use client'

import EventImage from '@/assets/news/open-event.png'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useAuthStore } from '@/stores/login'

export default function NewsModal() {
  const { isLogin } = useAuthStore()
  const [isOpen, setIsOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // 모달이 열릴 때마다 isVisible true로 초기화
  useEffect(() => {
    const closedDate = localStorage.getItem('news-modal-closed-date')
    if (closedDate && dayjs(closedDate).isSame(dayjs(), 'day')) setIsOpen(false)

    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10)
    }
  }, [isOpen])

  const handleCloseToday = () => {
    localStorage.setItem('news-modal-closed-date', dayjs().format('YYYY-MM-DD'))
    handleClose()
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 300) // 트랜지션 시간과 맞춤
  }

  if (!isLogin) return null

  if (!isOpen) return null

  return (
    <div
      className={clsx(
        'full-width fixed inset-0 z-50 m-auto flex items-center justify-center bg-black/70 px-7 transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div className="flex flex-col gap-3">
        <a href="https://forms.gle/aKYxA1zJ5RCeQJZF8" target="_blank">
          <img src={EventImage.src} alt="news image" className="w-full" />
        </a>
        <div className="text-body4 text-basic-white flex items-center justify-between px-0.5">
          <button onClick={handleCloseToday}>오늘 하루 보지 않기</button>
          <button onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  )
}
