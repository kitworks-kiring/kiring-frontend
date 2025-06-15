export function isLikelyValidToken(token: string): boolean {
  try {
    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) return false

    const decoded = JSON.parse(atob(payload))
    const exp = decoded.exp
    const now = Math.floor(Date.now() / 1000)
    return typeof exp === 'number' && exp > now
  } catch {
    return false
  }
}
