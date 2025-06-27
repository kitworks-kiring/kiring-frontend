import { useRef, useCallback } from 'react'

interface DragDirection {
  onDragUp?: (distance: number) => void
  onDragDown?: (distance: number) => void
}

export function useSectionDrag(callbacks: DragDirection, minDistance: number = 20) {
  const touchStart = useRef<{ y: number; time: number } | null>(null)
  const isDragging = useRef(false)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStart.current = {
      y: touch.clientY,
      time: Date.now(),
    }
    isDragging.current = false
  }, [])

  const handleTouchMove = useCallback(() => {
    if (!touchStart.current) return
    isDragging.current = true
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current || !isDragging.current) {
        touchStart.current = null
        return
      }

      const touch = e.changedTouches[0]
      const deltaY = touchStart.current.y - touch.clientY
      const deltaTime = Date.now() - touchStart.current.time

      if (Math.abs(deltaY) >= minDistance && deltaTime > 100) {
        if (deltaY > 0) {
          callbacks.onDragUp?.(Math.abs(deltaY))
        } else {
          callbacks.onDragDown?.(Math.abs(deltaY))
        }
      }

      touchStart.current = null
      isDragging.current = false
    },
    [callbacks, minDistance],
  )

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}
