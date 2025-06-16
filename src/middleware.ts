import { NextRequest, NextResponse } from 'next/server'
import { isLikelyValidToken } from '@/lib/jwt'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  const isLoginPage = new Set(['/login', '/login/callback']).has(pathname)
  const isProtectedPage = ['/mypage', '/community'].some((prefix) => pathname.startsWith(prefix))

  // 토큰 존재 여부와 유효성 모두 검증
  const isAuthenticated = accessToken ? isLikelyValidToken(accessToken) : false

  // 1. 로그인 완료 후 로그인/콜백 페이지 접근 시 → 홈으로
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. 로그인 전 보호 페이지 접근 시 → 로그인으로
  if (!isAuthenticated && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/login/callback', '/mypage/:path*'],
}
