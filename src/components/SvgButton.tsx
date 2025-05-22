'use client'

interface SvgButtonProps {
  icon: React.ReactNode
  onClick: () => void
  width?: number
  height?: number
  bottomTitle?: React.ReactNode
  ariaLabel?: string
}

export default function SvgButton({
  icon: Icon,
  onClick,
  width = 24,
  height = 24,
  bottomTitle,
  ariaLabel,
}: SvgButtonProps) {
  return (
    <button
      className={`w-[${width}px] h-[${height}px] flex flex-col items-center justify-center ${bottomTitle ? 'gap-1' : ''}`}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {Icon}
      {bottomTitle && bottomTitle}
    </button>
  )
}
