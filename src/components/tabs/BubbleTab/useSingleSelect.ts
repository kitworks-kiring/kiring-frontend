'use client'

import { useState, useCallback } from 'react'

export function useSingleSelect(initialValue: string): {
  selected: string
  onSelect: (tab: string) => void
} {
  const [selected, setSelected] = useState(initialValue)

  const onSelect = useCallback((newValue: string) => {
    setSelected(newValue)
  }, [])

  return { selected, onSelect }
}
