
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '../firebase';
import { collection, query, where, limit, DocumentData } from 'firebase/firestore';
import Image from 'next/image';

interface Product extends DocumentData {
  id: string;
  name: string;
  category: string;
  images: string[];
  price: number;
}

const Header: React.FC<{ simplified?: boolean }> = ({ simplified }) => {
    const { cartCount } = useCart();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const firestore = useFirestore();

    const productsRef = useMemoFirebase(() => {
        if (!firestore || search.trim().length < 2) return null;
        // This query attempts to do a "starts with" search.
        // It requires an index on the 'name' field.
        return query(
            collection(firestore, 'products'),
            where('name', '>=', search.trim()),
            where('name', '<=', search.trim() + '\uf8ff'),
            limit(5)
        );
    }, [firestore, search]);

    const { data: suggestions } = useCollection<Product>(productsRef);

    useEffect(() => {
        if (search.trim().length >= 2) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [search, suggestions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/products?q=${encodeURIComponent(search)}`);
            setIsMenuOpen(false);
            setShowSuggestions(false);
        }
    };

    const handleAccountClick = () => {
        if (user) {
            router.push('/auth'); // Navigate to dashboard/profile page
        } else {
            router.push('/auth'); // Navigate to login/signup page
        }
    };

    if (simplified) {
        return (
            <header className="bg-white dark:bg-[#1a120d] border-b border-[#f4f2f0] dark:border-[#3a2d26] sticky top-0 z-50">
                <div className="px-6 md:px-10 py-4 max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                        <h1 className="text-xl font-bold tracking-tight">Cj.Drk</h1>
                    </Link>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <span className="material-symbols-outlined text-lg">lock</span>
                        Secure Checkout
                    </div>
                </div>
            </header>
        );
    }

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#181311]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsMenuOpen(true)}
                                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div className="hidden md:flex items-center gap-8">
                                <Link href="/products" className="text-sm font-semibold hover:text-primary transition-colors">Shop</Link>
                                <Link href="/about" className="text-sm font-semibold hover:text-primary transition-colors">About</Link>
                                <Link href="/blog" className="text-sm font-semibold hover:text-primary transition-colors">Blog</Link>
                            </div>
                        </div>
                        
                        <Link href="/" className="flex items-center gap-2">
                           <Image src="https://firebasestorage.googleapis.com/v0/b/cjdrkcosmeticstore.appspot.com/o/Logo.png.png?alt=media" alt="Cj.Drk Logo" width={32} height={32} className="h-8 w-8 object-contain" />
                           <h1 className="text-xl font-bold tracking-tight">Cj.Drk</h1>
                        </Link>
                        
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="hidden lg:block relative" ref={searchRef}>
                                <form onSubmit={handleSearch} className="relative group">
                                    <input 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onFocus={() => search.trim().length >= 2 && setShowSuggestions(true)}
                                        className="bg-gray-100 dark:bg-gray-800 border-none rounded-md px-4 py-2 text-sm w-48 focus:ring-1 focus:ring-primary focus:w-64 transition-all duration-300" 
                                        placeholder="Search..." 
                                        type="text" 
                                    />
                                    <button type="submit" className="material-symbols-outlined absolute right-3 top-2 text-gray-400 text-lg hover:text-primary">search</button>
                                </form>
                                
                                {showSuggestions && (suggestions?.length ?? 0) > 0 && (
                                    <div className="absolute top-full mt-2 left-0 w-80 bg-white dark:bg-gray-900 shadow-2xl rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-3 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Products</span>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {suggestions!.map(product => (
                                                <Link 
                                                    key={product.id}
                                                    href={`/product/${product.id}`}
                                                    onClick={() => { setShowSuggestions(false); setSearch(''); }}
                                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <Image src={product.images[0] || 'https://placehold.co/40x40'} className="size-10 rounded-lg object-cover bg-gray-100" alt={product.name} width={40} height={40} />
                                                    <div className="flex-1">
                                                        <p className="text-xs font-bold truncate">{product.name}</p>
                                                        <p className="text-[10px] text-primary font-medium">Rs {product.price.toFixed(2)}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <button 
                                            onClick={handleSearch}
                                            className="w-full p-3 text-center text-xs font-bold text-gray-500 hover:text-primary border-t border-gray-50 dark:border-gray-800 transition-colors"
                                        >
                                            View all results
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Link href="/cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {cartCount > 0 && <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">{cartCount}</span>}
                            </Link>
                            <button 
                                onClick={handleAccountClick}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block overflow-hidden"
                            >
                                {user && !isUserLoading && user.photoURL ? (
                                    <Image src={user.photoURL} alt="User" className="size-6 rounded-full object-cover" width={24} height={24} />
                                ) : (
                                    <span className="material-symbols-outlined">account_circle</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute top-0 left-0 h-full w-[280px] bg-white dark:bg-[#181311] shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                                <span className="font-bold text-lg">Cj.Drk</span>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                <span className="material-symbols-outlined text-gray-500">close</span>
                            </button>
                        </div>
                        
                        <div className="mb-8 relative" ref={searchRef}>
                            <form onSubmit={handleSearch} className="relative">
                                <input 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-primary" 
                                    placeholder="Search products..." 
                                    type="text" 
                                />
                                <button type="submit" className="material-symbols-outlined absolute right-3 top-3 text-gray-400">search</button>
                            </form>
                            
                            {showSuggestions && (suggestions?.length ?? 0) > 0 && (
                                <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10">
                                    {suggestions!.map(product => (
                                        <Link 
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            onClick={() => { setIsMenuOpen(false); setShowSuggestions(false); setSearch(''); }}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <Image src={product.images[0] || 'https://placehold.co/32x32'} className="size-8 rounded object-cover" alt={product.name} width={32} height={32}/>
                                            <span className="text-xs font-bold truncate">{product.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <nav className="flex flex-col gap-4">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100 dark:border-gray-800">Home</Link>
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100 dark:border-gray-800">Shop All</Link>
                            <Link href="/products?category=soaps" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100 dark:border-gray-800 pl-4 text-gray-600 dark:text-gray-400">Soaps</Link>
                            <Link href="/products?category=perfumes" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100 dark:border-gray-800 pl-4 text-gray-600 dark:text-gray-400">Perfumes</Link>
                            <Link href="/products?category=serums" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100 dark:border-gray-800 pl-4 text-gray-600 dark:text-gray-400">Serums</Link>
                            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2 border-b border-gray-100 dark:border-gray-800">About Us</Link>
                            <button onClick={() => { handleAccountClick(); setIsMenuOpen(false); }} className="text-left text-lg font-semibold py-2">My Account</button>
                        </nav>
                        
                        <div className="mt-auto pt-8 flex gap-4">
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">share</span></a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">mail</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;

    