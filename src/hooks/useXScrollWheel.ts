import { useRef, useCallback, useEffect, useMemo } from 'react'

function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function useXScrollWheel(debounceMs: number = 0) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMouseOver = useRef(false)

  const scrollHandler = useCallback((e: WheelEvent) => {
    if (e.deltaY === 0 || e.deltaX !== 0) return

    const element = scrollRef.current
    if (!element || !isMouseOver.current) return

    const { scrollLeft, scrollWidth, clientWidth } = element
    const maxScrollLeft = scrollWidth - clientWidth

    // 스크롤 여유 공간 확인 (약간의 tolerance 추가)
    const tolerance = 5
    const canScrollRight = scrollLeft < maxScrollLeft - tolerance
    const canScrollLeft = scrollLeft > tolerance

    const isScrollingRight = e.deltaY > 0
    const isScrollingLeft = e.deltaY < 0

    // 가로 스크롤이 가능한 경우에만 처리
    if ((isScrollingRight && canScrollRight) || (isScrollingLeft && canScrollLeft)) {
      e.preventDefault()
      e.stopPropagation() // 이벤트 버블링도 막기

      requestAnimationFrame(() => {
        element.scrollLeft += e.deltaY
      })
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    isMouseOver.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isMouseOver.current = false
  }, [])

  const debouncedHandler = useMemo(
    () => debounce(scrollHandler, debounceMs),
    [scrollHandler, debounceMs],
  )

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    element.addEventListener('wheel', debouncedHandler, { passive: false })
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('wheel', debouncedHandler)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [debouncedHandler, handleMouseEnter, handleMouseLeave])

  return scrollRef
}
