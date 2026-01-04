'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const MOCK_USER = {
    name: 'Sarah Patel',
    avatar: 'https://picsum.photos/seed/u1/80/80',
    memberSince: 2021,
    orderCount: 12,
    points: 1450,
    memberStatus: 'Gold Tier',
};

const recentOrders = [
    {
        id: '#ORD-7392',
        date: 'Oct 24, 2023',
        status: 'Delivered',
        total: '1240.00',
        statusColor: 'bg-green-100 text-green-700',
    },
    {
        id: '#ORD-7355',
        date: 'Sep 12, 2023',
        status: 'Shipped',
        total: '455.50',
        statusColor: 'bg-blue-100 text-blue-700',
    },
];

export default function DashboardPage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        if (auth) {
            await signOut(auth);
            router.push('/');
        }
    };

    if (isUserLoading) {
        return <div className="p-20 text-center">Loading...</div>
    }

    if (!user) {
        // This is a protected route, redirect to login if not authenticated
        // Or show a message
        // For now, redirecting to home as an example
        if (typeof window !== 'undefined') {
            router.push('/');
        }
        return <div className="p-20 text-center">Please sign in to view your dashboard.</div>;
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="size-20 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                                <Image src={MOCK_USER.avatar} alt={MOCK_USER.name} width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-lg font-bold">{MOCK_USER.name}</h2>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                            <p className="text-gray-500 text-xs mt-1">Member since {MOCK_USER.memberSince}</p>
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
                        <h2 className="text-3xl font-bold tracking-tight">Hello, {MOCK_USER.name.split(' ')[0]}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700 shadow-sm">
                                <span className="text-3xl font-bold text-primary">{MOCK_USER.orderCount}</span>
                                <p className="text-sm text-gray-500 font-medium mt-1">Total Orders</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700 shadow-sm">
                                <span className="text-3xl font-bold text-primary">{MOCK_USER.points}</span>
                                <p className="text-sm text-gray-500 font-medium mt-1">Loyalty Points</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700 shadow-sm col-span-2 md:col-span-1">
                                <span className="text-3xl font-bold text-green-500">{MOCK_USER.memberStatus}</span>
                                <p className="text-sm text-gray-500 font-medium mt-1">Member Status</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Recent Orders</h3>
                            <button className="text-primary text-sm font-bold hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-700 text-sm">
                                    {recentOrders.map(order => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 font-medium">{order.id}</td>
                                            <td className="px-6 py-4">{order.date}</td>
                                            <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded-full text-xs ${order.statusColor}`}>{order.status}</span></td>
                                            <td className="px-6 py-4 font-bold">Rs {order.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};
