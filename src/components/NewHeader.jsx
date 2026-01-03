
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet"
import { useState } from 'react';

export default function NewHeader() {
  const { cartCount } = useCart();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const navLinks = [
    { href: '/products', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ];

  const NavLinks = ({ mobile = false }) => (
    navLinks.map((link) => (
      <Button variant="ghost" asChild key={link.href}>
        <Link href={link.href} onClick={() => mobile && setSheetOpen(false)} className="text-sm font-semibold hover:text-primary transition-colors">
          {link.label}
        </Link>
      </Button>
    ))
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#181311]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>

          {/* Center: Brand */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">spa</span>
            <Link href="/">
                <h1 className="text-xl font-bold tracking-tight">Cj.Drk Cosmetic Store</h1>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:block relative group">
              <input className="bg-gray-100 dark:bg-gray-800 border-none rounded-md px-4 py-2 text-sm w-48 focus:ring-1 focus:ring-primary focus:w-64 transition-all duration-300" placeholder="Search..." type="text"/>
              <span className="material-symbols-outlined absolute right-3 top-2 text-gray-400 text-lg">search</span>
            </div>

            <Button asChild variant="ghost" className="relative p-2 rounded-full">
              <Link href="/cart">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>}
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="hidden sm:block p-2 rounded-full">
                <Link href="/auth">
                    <span className="material-symbols-outlined">account_circle</span>
                </Link>
            </Button>
            
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2 rounded-full">
                    <span className="material-symbols-outlined">menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                        <Link href="/" onClick={() => setSheetOpen(false)}>
                            <h1 className="text-xl font-bold tracking-tight">Cj.Drk Cosmetic Store</h1>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-2">
                      <NavLinks mobile={true} />
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
