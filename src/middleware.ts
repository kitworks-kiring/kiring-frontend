import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  let isAuthenticated = false
  let shouldRemoveCookies = false

  // 내 정보 API 호출로 accessToken 유효성 확인
  const checkValidToken = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/member/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const result = await res.json()

      if (result.result === 'SUCCESS') {
        isAuthenticated = true
      } else {
        shouldRemoveCookies = true
      }
    } catch (error) {
      console.error('❌ Token 유효성 error:', error)
      shouldRemoveCookies = true
    }
  }

  if (accessToken) await checkValidToken()

  const isLoginPage = ['/login', '/login/callback'].includes(pathname)
  const isProtectedPage = ['/profile', '/community', '/plane'].some((prefix) =>
    pathname.startsWith(prefix),
  )

  // 1. 로그인된 사용자가 로그인 페이지 접근 → 홈으로 리디렉트
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. 비로그인 사용자가 보호 페이지 접근 → 로그인 페이지로 리디렉트
  if (!isAuthenticated && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. 유효성 검사 실패 시 → 토큰 삭제 및 상태 정리 (CSR에서 checkToken 실행)
  if (shouldRemoveCookies) {
    const res = NextResponse.next()
    res.cookies.delete('accessToken')
    res.cookies.delete('refreshToken')
    // 응답 브라우저에 전달
    return res
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
