
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardPageContent() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/');
        }
    }, [isUserLoading, user, router]);

    const handleLogout = async () => {
        if (auth) {
            await signOut(auth);
            router.push('/');
        }
    };

    if (isUserLoading || !user) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <Skeleton className="h-64 w-full" />
                    </aside>
                    <div className="flex-1 space-y-8">
                         <Skeleton className="h-12 w-1/3" />
                         <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                         </div>
                         <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="size-20 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                                <Image src={user.photoURL || `https://i.pravatar.cc/80?u=${user.uid}`} alt={user.displayName || 'User Avatar'} width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-lg font-bold">{user.displayName || 'User'}</h2>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                        <nav className="flex flex-col gap-1">
                            <Link href="/auth" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold">
                                <span className="material-symbols-outlined text-[20px] fill-current">dashboard</span> Dashboard
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span> Orders
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span className="material-symbols-outlined text-[20px]">location_on</span> Addresses
                            </Link>
                            <hr className="my-2 dark:border-gray-700" />
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <span className="material-symbols-outlined text-[20px]">logout</span> Logout
                            </button>
                        </nav>
                    </div>
                </aside>

                <div className="flex-1 space-y-8">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Hello, {user.displayName ? user.displayName.split(' ')[0] : 'User'}</h2>
                         <p className="text-gray-500">Welcome to your dashboard. Here you can view your recent activity.</p>
                    </section>
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Recent Orders</h3>
                            <button className="text-primary text-sm font-bold hover:underline">View All</button>
                        </div>
                       <div className="text-center py-20">
                            <p className="text-gray-500">You have no recent orders.</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}


export default function DashboardPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <DashboardPageContent /> : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <Skeleton className="h-64 w-full" />
                </aside>
                <div className="flex-1 space-y-8">
                     <Skeleton className="h-12 w-1/3" />
                     <div className="grid grid-cols-3 gap-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                     </div>
                     <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </main>
    );
}
