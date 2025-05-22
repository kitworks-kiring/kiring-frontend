'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: '/' });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">로그인</h2>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleKakaoLogin}
            className="group relative flex w-full justify-center rounded-md bg-[#FEE500] px-3 py-2 text-sm font-semibold text-black hover:bg-[#FDD835] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEE500]"
          >
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
