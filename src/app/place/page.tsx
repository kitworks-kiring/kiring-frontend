'use client'

import { useState } from 'react'
import MainTab from '@/components/MainTab'

export default function Place() {
  const [currentTabIdx, setCurrentTabIdx] = useState(0)
  const mainTabList = [
    {
      label: '맛집',
      type: 'restaurant',
    },
    {
      label: '산책로',
      type: 'trail',
    },
  ]
  const onTabClick = (idx: number) => setCurrentTabIdx(idx)

  return (
    <section className="h-full">
      <MainTab mainTabList={mainTabList} currentTabIdx={currentTabIdx} onTabClick={onTabClick} />
      {currentTabIdx === 0 && (
        <div className="p-4">
          <h2 className="font-body1-sb">맛집 목록</h2>
        </div>
      )}
    </section>
  )
}
