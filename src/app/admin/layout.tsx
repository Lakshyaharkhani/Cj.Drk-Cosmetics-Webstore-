
'use client';

import {
  Bell,
  Home,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
  LogOut,
  Soap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: 5 },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
];

const AdminNavLink = ({
  href,
  label,
  icon: Icon,
  badge,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}) => {
  const pathname = usePathname();
  const isActive = href === '/admin' ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group',
        isActive
          ? 'text-primary bg-primary/10'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
      )}
    >
      <Icon className={cn('h-5 w-5', !isActive && 'text-gray-400 group-hover:text-gray-500')} />
      {label}
      {badge && (
        <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f6f6] dark:bg-[#181311] text-[#181311] dark:text-gray-100 font-display transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-[#f8f6f6]/95 dark:bg-[#181311]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <Soap className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <h1 className="text-xl font-bold tracking-tight text-[#181311] dark:text-white">
                  NatureSoap{' '}
                  <span className="text-xs font-normal text-gray-500 ml-1 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  className="bg-transparent border-none text-sm w-48 focus:ring-0 text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
                  placeholder="Search orders, products..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#181311]"></span>
                </button>
                <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 pr-3 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    JD
                  </div>
                  <span className="text-sm font-medium hidden md:block">Jane Doe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-grow flex w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            {navLinks.map((link) => (
              <AdminNavLink key={link.href} {...link} />
            ))}

            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">System</h3>
                <a className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors group" href="#">
                    <Settings className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Settings
                </a>
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors group">
                    <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Logout
                </Link>
            </div>
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
