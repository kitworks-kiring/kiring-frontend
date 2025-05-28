'use client'

import clsx from 'clsx'

export default function MainTab({
  mainTabList,
  activeTab,
  onTabClick,
}: {
  mainTabList: {
    label: string
    type: string
  }[]
  activeTab: string
  onTabClick?: (type: string) => void
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
                type === activeTab
                  ? 'border-b-2 border-purple-500 text-purple-500'
                  : 'text-gray-600',
              )}
              onClick={() => onTabClick?.(type)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
