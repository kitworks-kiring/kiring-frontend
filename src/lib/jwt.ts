export function isLikelyValidToken(token: string): boolean {
  try {
    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) return false

    // Base64URL -> Base64 변환
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=')

    // 환경에 따라 디코딩
    const json =
      typeof Buffer !== 'undefined'
        ? Buffer.from(padded, 'base64').toString('utf8') // Node.js
        : atob(padded) // 브라우저

    const decoded = JSON.parse(json)
    const exp = decoded.exp
    const now = Math.floor(Date.now() / 1000)

    return typeof exp === 'number' && exp > now
  } catch {
    return false
  }
}
