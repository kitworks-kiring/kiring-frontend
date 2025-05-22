export function buildRspStatus(error: Error | null, defaultMessage = '성공') {
  return {
    code: error ? 500 : 200,
    message: error?.message ?? defaultMessage,
  }
}
