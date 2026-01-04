'use client';

import AuthForm from '@/components/AuthForm';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="min-h-screen bg-white dark:bg-[#181311] flex flex-col md:flex-row">
        {/* Branding / Image Side */}
        <div className="hidden md:flex md:w-1/2 relative bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <Image 
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop" 
                alt="Organic Skincare"
                fill
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                <Link href="/" className="flex items-center gap-2 mb-6 text-white group">
                    <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">spa</span>
                    <h1 className="text-2xl font-bold tracking-tight">Cj.Drk</h1>
                </Link>
                <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Pure beauty, <br/>refined by nature.</h2>
                <p className="text-gray-200 text-lg max-w-sm">Join our community of natural enthusiasts and unlock exclusive rewards with every purchase.</p>
            </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-24">
            <div className="md:hidden flex items-center gap-2 mb-12 self-start">
                <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                <h1 className="text-2xl font-bold tracking-tight">Cj.Drk</h1>
            </div>
            <AuthForm />
        </div>
    </div>
  );
}
