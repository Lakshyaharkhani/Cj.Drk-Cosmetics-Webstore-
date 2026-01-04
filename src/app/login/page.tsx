
'use client';

import AuthForm from '@/components/AuthForm';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      // If user is already logged in, redirect them to their dashboard
      router.push('/auth');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    // Show a loading state or nothing while redirecting
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <AuthForm />
    </div>
  );
}
