import clsx from 'clsx'
import { SUBWAY_GROUP_HEADER } from '@/app/(full-layout)/transit/constants'
import ArrowLeft from '@/assets/arrow-left.svg'
import ArrowRight from '@/assets/arrow-right.svg'

export default function GroupHeader({ number }: { number: number }) {
  return (
    <div
      className={clsx(
        'relative flex items-center justify-between rounded-full px-2 py-[2px] text-white',
        number === 2 ? 'line-2-bg' : 'line-9-bg',
      )}
    >
      <div className="flex h-6 items-center gap-1">
        <div className="opacity-80">
          <ArrowLeft />
        </div>
        <span className="body3">
          {SUBWAY_GROUP_HEADER[number as keyof typeof SUBWAY_GROUP_HEADER].from}
        </span>
      </div>

      <div className="flex h-6 items-center gap-1">
        <span className="body3">
          {SUBWAY_GROUP_HEADER[number as keyof typeof SUBWAY_GROUP_HEADER].to}
        </span>
        <div className="opacity-80">
          <ArrowRight />
        </div>
      </div>

      <div
        className={clsx(
          'flex-row-center position-centered-y position-centered-x absolute gap-1 rounded-full border-4 bg-white px-10 py-1.5',
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
