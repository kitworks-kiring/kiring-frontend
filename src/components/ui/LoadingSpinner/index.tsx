import clsx from 'clsx'

export default function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex-col-center h-full gap-6" role="status">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-100" />
        <div className="absolute top-0 left-0 h-12 w-12 animate-spin rounded-full border-4 border-purple-300 border-t-transparent" />
      </div>
      <p className={clsx('body1 text-gray-600', { 'sr-only': !message })}>
        {message || '콘텐츠를 불러오는 중이에요.'}
      </p>
    </div>
  )
}
