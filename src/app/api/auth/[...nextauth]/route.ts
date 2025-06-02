import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao' // 카카오 OAuth 제공자

interface KakaoProfile {
  id: number // 카카오 고유 유저 ID
  kakao_account?: {
    profile?: {
      nickname: string
      profile_image_url: string
    }
  }
}

const formatPhoneNumber = (raw: string) => {
  return raw
    .replace('+82', '0') // 국가번호 제거 → +82 → 0
    .replace(/[-\s]/g, '') // 하이픈, 공백 제거
}

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!, // 카카오 REST API 키
      clientSecret: process.env.KAKAO_CLIENT_SECRET!, // 카카오 클라이언트 시크릿
      authorization: {
        params: {
          // prompt: 'login', // 자동 로그인
          prompt: 'login consent', // 로그인 동의 화면 표시
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 일
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // 로그인 성공 후 호출되는 콜백 함수
  callbacks: {
    async signIn({ profile }) {
      // 로그인 허용 여부 판단 (백엔드 검증)
      try {
        const kakaoProfile = profile as KakaoProfile
        const kakaoId = kakaoProfile.id
        // const phoneNumber = formatPhoneNumber(kakaoProfile.kakao_account?.phone_number || '') // 전화번호 포맷팅 (필요시)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${kakaoId}`)
        if (res.status === 200) {
          return true // 로그인 허용
        }

        // 🧪 테스트 계정 허용
        const testKakaoId = Number(process.env.TEST_KAKAO_ID) // 테스트용 카카오 ID
        const testPhone = formatPhoneNumber(process.env.TEST_KAKAO_PHONE || '') // 테스트용 전화번호
        if (kakaoId === testKakaoId && testPhone) {
          return true
        }

        // 회원이 아니면 로그인 페이지로 리다이렉트 + 쿼리스트링 전달
        return `/login?error=AUTH_ERROR_${res.status}`
      } catch (error) {
        return `/login?error=${(error as Error).message}`
      }
    },
    async jwt({ token, account, profile }) {
      // 로그인 후 사용자 정보 JWT 토큰 저장
      if (account && profile) {
        const kakaoProfile = profile as KakaoProfile
        token.id = kakaoProfile.id // 카카오 고유 유저 ID
        token.name = kakaoProfile.kakao_account?.profile?.nickname // 닉네임
        token.picture = kakaoProfile.kakao_account?.profile?.profile_image_url // 프로필 이미지
      }
      return token
    },
    async session({ session, token }) {
      // 클라이언트에 전달할 세션 정보 구성
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.image = token.picture
      }
      // 세션에 JWT 토큰 정보 추가
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development', // 개발 환경에서만 디버그 모드 활성화
})

export { handler as GET, handler as POST }
