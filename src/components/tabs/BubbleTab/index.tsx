'use client'

import clsx from 'clsx'

export interface BubbleItem {
  label: string
  value: string
}

interface BubbleTabProps {
  bubbles: BubbleItem[]
  active: string
  onChange: (value: string) => void
  propsClass?: string
}

export default function BubbleTab({ bubbles, active, onChange, propsClass }: BubbleTabProps) {
  return (
    <section>
      <ul className="flex items-center gap-2 border-b-4 border-gray-50 px-4 py-3">
        {bubbles.map(({ label, value }) => (
          <li key={value} className="flex-row-center">
            <button
              type="button"
              aria-pressed={value === active}
              tabIndex={value === active ? 0 : -1}
              className={clsx(
                'body4 rounded-3xl border px-4 py-2',
                value === active ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-200',
                propsClass,
              )}
              onClick={() => onChange(value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
