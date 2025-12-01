
'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart } from '@/context/CartContext';
import { getCategories } from '@/lib/data';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react';

export default function Header() {
  const { cartCount } = useCart();
  const categories = getCategories();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLinks = () => (
    categories.map((category) => (
      <Button variant="ghost" asChild key={category.id}>
        <Link href={`/products?category=${category.slug}`} onClick={() => setSheetOpen(false)}>
          {category.name}
        </Link>
      </Button>
    ))
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 p-4">
                  <Link href="/" className="font-headline text-2xl font-bold mb-4" onClick={() => setSheetOpen(false)}>
                    Cj.Drk
                  </Link>
                  <nav className="flex flex-col gap-2">
                    <NavLinks />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="font-headline text-2xl font-bold">
            Cj.Drk
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <Input type="search" placeholder="Search products..." className="w-48 lg:w-64" />
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/auth">
              <User className="h-5 w-5" />
               <span className="sr-only">Login / Sign Up</span>
            </Link>
          </Button>

           <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <Shield className="h-5 w-5" />
               <span className="sr-only">Admin</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
