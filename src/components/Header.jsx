'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart } from '../context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet"
import { useState } from 'react';
import { Separator } from './ui/separator';
import { useCollection, useFirestore, useMemoFirebase } from '../firebase';
import { collection } from 'firebase/firestore';

export default function Header() {
  const { cartCount } = useCart();
  const firestore = useFirestore();
  const categoriesRef = useMemoFirebase(() => collection(firestore, 'categories'), [firestore]);
  const { data: categories } = useCollection(categoriesRef);

  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLinks = () => (
    categories?.map((category) => (
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
                  <Separator className="my-4" />
                  <div className="flex flex-col gap-2">
                     <Button variant="outline" asChild>
                        <Link href="/auth" onClick={() => setSheetOpen(false)}>
                            <User className="mr-2" /> Login / Sign Up
                        </Link>
                     </Button>
                  </div>
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
          
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth">
                <User className="h-5 w-5" />
                <span className="sr-only">Login / Sign Up</span>
              </Link>
            </Button>
          </div>


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
