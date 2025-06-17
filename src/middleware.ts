import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  let isAuthenticated = false
  let shouldRemoveCookies = false

  // 인증 검사
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
      console.log('✅ 인증 성공:', result.data)
    } else {
      console.log('❌ 인증 실패:', result.message)
      shouldRemoveCookies = true
    }
  } catch (error) {
    console.error('❌ 인증 fetch 에러:', error)
    shouldRemoveCookies = true
  }

  const isLoginPage = new Set(['/login', '/login/callback']).has(pathname)
  const isProtectedPage = ['/mypage', '/community'].some((prefix) => pathname.startsWith(prefix))

  // 리다이렉트 응답 생성
  if (isAuthenticated && isLoginPage) {
    const res = NextResponse.redirect(new URL('/', request.url))
    if (shouldRemoveCookies) {
      res.cookies.delete('accessToken')
      res.cookies.delete('refreshToken')
      console.log('🧹 쿠키 삭제됨 (홈 리디렉트)')
    }
    return res
  }

  if (!isAuthenticated && isProtectedPage) {
    const res = NextResponse.redirect(new URL('/login', request.url))
    if (shouldRemoveCookies) {
      res.cookies.delete('accessToken')
      res.cookies.delete('refreshToken')
      console.log('🧹 쿠키 삭제됨 (로그인 리디렉트)')
    }
    return res
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
