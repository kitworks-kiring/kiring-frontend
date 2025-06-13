'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import clsx from 'clsx'
import IcoToggle from '@/assets/ico-toggle.svg'

export interface SortItem {
  label: string
  value: string
}

interface SortSelectBoxProps {
  sortOptions: SortItem[]
  active: string
  onChange: (value: string) => void
}

export default function SortSelectBox({ sortOptions, active, onChange }: SortSelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentActive = sortOptions.find((option) => option.value === active) ?? sortOptions[0]

  const sortContainerRef = useRef<HTMLDivElement>(null)

  // dropdown 외부 클릭 시 닫기
  const onClickContainerOutside = useCallback((e: MouseEvent) => {
    const target = e.target as Node
    if (sortContainerRef.current && !sortContainerRef.current.contains(target)) {
      setIsOpen(false)
    }
  }, [])

  // 정렬 옵션 클릭 시
  const onSortClick = (value: string) => {
    onChange(value)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('mousedown', onClickContainerOutside)
    return () => document.removeEventListener('mousedown', onClickContainerOutside)
  }, [isOpen, onClickContainerOutside])

  return (
    <div ref={sortContainerRef} className="relative w-18 text-sm">
      <label id="sortbox-label" className="sr-only">
        리스트 정렬 기준
      </label>
      <button
        type="button"
        id="sortbox-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="custom-select-list"
        aria-labelledby="sortbox-label sortbox-button"
        className="body4 flex w-full justify-between rounded-sm border border-transparent px-2 py-1 outline-none focus-visible:border focus-visible:border-purple-100"
        onClick={() => setIsOpen((prev: boolean) => !prev)}
      >
        <span>{currentActive?.label}</span>
        <div aria-hidden="true" className={clsx('flex items-center', isOpen ? 'rotate-180' : '')}>
          <IcoToggle />
        </div>
      </button>
      {isOpen && (
        <ul
          id="custom-select-list"
          role="listbox"
          aria-labelledby="sortbox-label"
          className="absolute right-0 w-full rounded-sm border text-center"
          tabIndex={-1}
        >
          {sortOptions.map(({ label, value }, index) => (
            <li
              key={value}
              role="option"
              aria-selected={value === active}
              className={clsx(
                'body4 cursor-pointer p-1 hover:bg-purple-50',
                value === active ? 'bg-purple-500 text-white hover:bg-purple-500' : 'bg-white',
                index === 0 && 'rounded-t-sm',
                index === sortOptions.length - 1 && 'rounded-b-sm',
              )}
              onClick={() => onSortClick(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
