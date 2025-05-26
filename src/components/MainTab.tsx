'use client'

import clsx from 'clsx'

export default function MainTab({
  mainTabList,
  currentTabIdx,
  onTabClick,
}: {
  mainTabList: {
    label: string
    type: string
  }[]
  currentTabIdx: number
  onTabClick?: (idx: number) => void
}) {
  return (
    <section className="border-b border-gray-100 px-4">
      <ul className="flex">
        {mainTabList?.map(({ label, type }, idx) => (
          <li key={`${type}-${idx}`} className="flex-row-center h-9 w-15">
            <button
              type="button"
              className={clsx(
                'font-body2-sb flex h-full flex-col items-center justify-start',
                'transition-colors',
                idx === currentTabIdx
                  ? 'border-b-2 border-purple-500 text-purple-500'
                  : 'text-gray-600',
              )}
              onClick={() => onTabClick?.(idx)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
