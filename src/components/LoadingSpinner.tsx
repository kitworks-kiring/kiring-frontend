export default function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex-col-center h-full gap-6">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-100"></div>
        <div className="absolute top-0 left-0 h-12 w-12 animate-spin rounded-full border-4 border-purple-300 border-t-transparent"></div>
      </div>
      {message && (
        <div className="text-center">
          <p className="body1 text-gray-600">{message}</p>
        </div>
      )}
    </div>
  )
}
