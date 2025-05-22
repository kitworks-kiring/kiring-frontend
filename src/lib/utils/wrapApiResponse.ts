type Options<T> = {
  fallbackData?: T
  successCode?: number
  successMessage?: string
  failureMessage?: string
  errorCode?: number
  onError?: (e: unknown) => void
}

export async function wrapApiResponse<T>(
  fn: () => Promise<T>,
  options: Options<T> = {},
): Promise<[T | undefined, Error | null]> {
  const { onError } = options

  try {
    const result = await fn()
    return [result, null]
  } catch (e) {
    if (onError) onError(e)

    const error = e instanceof Error ? e : new Error(String(e))
    console.error('❌ API 처리 중 에러:', error.message, error)

    return [undefined, error]
  }
}
