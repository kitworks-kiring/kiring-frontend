import clsx from 'clsx'

function WideCardSkeletonUi() {
  const flexItemsCenter = 'body5 flex items-center'
  const divGrayAnimation = 'bg-gray-200 animate-pulse'
  const roundedSm = `${divGrayAnimation} rounded-sm`
  const roundedFull = `${divGrayAnimation} rounded-full`

  return (
    <div className="grid gap-3 border-b border-gray-50 px-3 py-4">
      <div className={clsx('roundedSm aspect-[414/210]', roundedSm)} />
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between">
          <div className={clsx('body5 gap-1', flexItemsCenter)}>
            <div className={clsx('h-3 w-20', roundedSm)} />
          </div>
          <div className="flex items-start justify-end">
            <div className={clsx('h-5 w-5', roundedFull)} />
          </div>
        </li>
        <li className={clsx(flexItemsCenter, 'gap-2 text-gray-600')}>
          <div className={clsx(flexItemsCenter, 'gap-0.5')}>
            <div className={clsx('h-3 w-3', roundedFull)} />
            <div className={clsx('h-3 w-8', roundedSm)} />
          </div>
          <span>/</span>
          <div className={clsx('h-3 w-8', roundedSm)} />
          <span>/</span>
          <div className={clsx('h-3 w-20', roundedSm)} />
        </li>
        <li>
          <ul className={clsx(flexItemsCenter, 'body6 gap-1')}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} className={clsx('rounded-lg bg-gray-50 px-3 py-2', divGrayAnimation)} />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default function WideSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <WideCardSkeletonUi key={idx} />
      ))}
    </>
  )
}
