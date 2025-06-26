import clsx from 'clsx'

function NarrowCardSkeletonUi() {
  const flexItemsCenter = 'body5 flex items-center'
  const divGrayAnimation = 'bg-gray-200 animate-pulse'
  const roundedSm = `${divGrayAnimation} rounded-sm`
  const roundedFull = `${divGrayAnimation} rounded-full`

  return (
    <div className="grid grid-cols-[1fr_2fr_0.5fr] border-b border-gray-50 px-3 py-4">
      <div className={clsx('h-25 min-h-20 w-25 min-w-20', roundedSm)} />
      <ul className="flex flex-col gap-2.5 pl-1 max-[400px]:pl-4">
        <li>
          <div className={clsx('h-4 w-30 rounded-2xl', divGrayAnimation)} />
        </li>
        <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
          <div className={clsx(flexItemsCenter, 'gap-0.5')}>
            <div className={clsx('h-3 w-3', roundedFull)} />
            <div className={clsx('h-3 w-6 rounded-2xl', divGrayAnimation)} />
          </div>
          <div className={clsx('ml-1 h-3 w-10 rounded-2xl', divGrayAnimation)} />
        </li>
        <li className={clsx(flexItemsCenter, 'items-start gap-1')}>
          <div className={clsx('h-3 w-4 rounded-2xl bg-gray-200', divGrayAnimation)} />
          <span className="body5 text-gray-300">/</span>
          <div className={clsx('h-3 w-8 rounded-2xl bg-gray-200', divGrayAnimation)} />
        </li>
        <li>
          <ul className={clsx(flexItemsCenter, 'body6 gap-1')}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} className={clsx('rounded-lg bg-gray-50 px-3 py-2', divGrayAnimation)} />
            ))}
          </ul>
        </li>
      </ul>
      <div className="flex h-5 items-start justify-end">
        <div className={clsx('h-5 w-5', roundedFull)} />
      </div>
    </div>
  )
}

export default function NarrowSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        <NarrowCardSkeletonUi key={idx} />
      ))}
    </>
  )
}
