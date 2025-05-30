'use client'

import { useState, useCallback } from 'react'

export function useBubble(newBubbleValue: string): {
  activeBubble: string
  onBubbleClick: (tab: string) => void
} {
  const [activeBubble, setActiveBubble] = useState(newBubbleValue)

  const onBubbleClick = useCallback((newBubbleValue: string) => {
    setActiveBubble(newBubbleValue)
  }, [])

  return { activeBubble, onBubbleClick }
}
