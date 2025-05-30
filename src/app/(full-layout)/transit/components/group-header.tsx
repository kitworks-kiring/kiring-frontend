import clsx from 'clsx'

const groupHeader = {
  2: {
    from: '영등포구청',
    to: '당산',
  },
  9: {
    from: '선유도',
    to: '당산',
  },
} as const

export default function GroupHeader({ number }: { number: number }) {
  return (
    <div
      className={clsx(
        'relative flex items-center justify-between rounded-full px-2 py-[2px] text-white',
        number === 2 ? 'line-2-bg' : 'line-9-bg',
      )}
    >
      <div className="flex items-center gap-2">
        <div>{'<'}</div>
        <span className="body3">{groupHeader[number as keyof typeof groupHeader].from}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="body3">{groupHeader[number as keyof typeof groupHeader].to}</span>
        <div>{'>'}</div>
      </div>

      <div
        className={clsx(
          'flex-row-center absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 gap-1 rounded-full border-4 bg-white px-10 py-1.5',
          number === 2 ? 'line-2-border' : 'line-9-border',
        )}
      >
        <div
          className={clsx(
            'flex-row-center aspect-square w-6 rounded-full text-center',
            number === 2 ? 'line-2-bg' : 'line-9-bg',
          )}
        >
          <span className="body3 text-white">{number}</span>
        </div>
        <span className="body2 text-black">당산</span>
      </div>
    </div>
  )
}
