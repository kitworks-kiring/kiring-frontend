'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md space-y-8">
        <div className="text-center">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || '프로필'}
              className="mx-auto h-24 w-24 rounded-full"
            />
          )}
          <h2 className="mt-4 text-2xl font-bold">
            {session.user?.name || '사용자'}
          </h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
