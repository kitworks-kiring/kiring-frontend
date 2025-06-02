import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    // 보호 페이지
    // '/settings/:path*',
    '/mypage/:path*',
    '/community/:path*',
  ],
};
