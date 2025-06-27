import { useRef, useCallback, useEffect } from 'react'

export function useXScrollWheel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMouseOver = useRef(false)

  const scrollHandler = useCallback((e: WheelEvent) => {
    // 이미 가로 스크롤 중이면 무시
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

    const element = scrollRef.current
    if (!element || !isMouseOver.current) return

    const { scrollLeft, scrollWidth, clientWidth } = element
    const maxScrollLeft = scrollWidth - clientWidth

    // 스크롤 필요 여부 확인
    if (maxScrollLeft <= 0) return

    const tolerance = 1
    const canScrollRight = scrollLeft < maxScrollLeft - tolerance
    const canScrollLeft = scrollLeft > tolerance

    const isScrollingRight = e.deltaY > 0
    const isScrollingLeft = e.deltaY < 0

    if ((isScrollingRight && canScrollRight) || (isScrollingLeft && canScrollLeft)) {
      e.preventDefault()
      e.stopPropagation()

      // 부드러운 스크롤
      element.scrollLeft += e.deltaY * 0.5
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    isMouseOver.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isMouseOver.current = false
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    // passive: false로 preventDefault 가능하게 설정
    element.addEventListener('wheel', scrollHandler, { passive: false })
    element.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      element.removeEventListener('wheel', scrollHandler)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [scrollHandler, handleMouseEnter, handleMouseLeave])

  return scrollRef
}
