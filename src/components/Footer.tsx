
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => (
    <footer className="bg-white dark:bg-[#181311] border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                        <h2 className="text-lg font-bold">Cj.Drk</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                        Handcrafted organic skincare made with love and intention by Cj.Drk. Sustainable, ethical, and pure.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-sm mb-4">Shop</h3>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                        <li><Link href="/products?category=soaps" className="hover:text-primary transition-colors">Soaps</Link></li>
                        <li><Link href="/products?category=perfumes" className="hover:text-primary transition-colors">Solid Perfumes</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-sm mb-4">About</h3>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                        <li><Link href="/ingredients" className="hover:text-primary transition-colors">Ingredients</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-sm mb-4">Support</h3>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li><Link href="/policy/shipping-policy" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                        <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col items-center gap-2">
                <p className="text-xs text-gray-400">© {new Date().getFullYear()} Cj.Drk. All rights reserved.</p>
                <Link href="/admin" className="text-[10px] font-medium text-gray-300 hover:text-primary transition-colors">
                    Admin Dashboard
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
