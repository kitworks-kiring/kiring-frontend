import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao'; // 카카오 OAuth 제공자


interface KakaoProfile {
  id: string;
  kakao_account?: {
    profile?: {
      nickname: string;
      profile_image_url: string;
    };
  };
}

const handler = NextAuth({
  providers: [
    //사용할 로그인 제공자(provider) 설정
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!, // 카카오 REST API 키
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      authorization: {
    params: {
      prompt: 'login',
    },
  },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login', // 에러 발생시 로그인 페이지로 리다이렉트
  },
   // 로그인 성공 후 호출되는 콜백 함수
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🚀 ~ signIn ~ user:", user)
      console.log("🚀 ~ signIn ~ account:", account)
      console.log("🚀 ~ signIn ~ profile:", profile)
      return true
    },
    async jwt({ token, account, profile }) {
      // 로그인 후 토큰에 사용자 정보 저장
      if (account && profile) {
        const kakaoProfile = profile as KakaoProfile;
        token.id = kakaoProfile.id; // 카카오 고유 유저 ID
        token.name = kakaoProfile.kakao_account?.profile?.nickname; // 닉네임
        token.picture = kakaoProfile.kakao_account?.profile?.profile_image_url; // 프로필 이미지
      }
      return token;
    },
    async session({ session, token }) {
      // 세션 객체에 토큰 정보 전달
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      console.log('NODE_ENV:', process.env.NODE_ENV)
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development', // 개발 환경에서만 디버그 모드 활성화
});

export { handler as GET, handler as POST };
