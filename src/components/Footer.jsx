
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '../firebase';
import { collection } from 'firebase/firestore';

export default function Footer() {
    const firestore = useFirestore();
    const policiesRef = useMemoFirebase(() => firestore ? collection(firestore, 'policies') : null, [firestore]);
    const { data: policies } = useCollection(policiesRef);

    const categoriesRef = useMemoFirebase(() => firestore ? collection(firestore, 'categories') : null, [firestore]);
    const { data: categories } = useCollection(categoriesRef);

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-headline text-xl mb-4">Cj.Drk</h3>
          <p className="text-sm">Your go-to for natural cosmetics. We provide quality, cold-pressed soaps and more.</p>
        </div>
        <div>
          <h3 className="font-headline text-lg mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            {categories?.map(category => (
                 <li key={category.id}><Link href={`/products?category=${category.slug}`} className="hover:text-primary transition-colors">{category.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-lg mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            {policies?.map(policy => (
                <li key={policy.slug}>
                    <Link href={`/policy/${policy.slug}`} className="hover:text-primary transition-colors">{policy.title}</Link>
                </li>
            ))}
          </ul>
        </div>
        <div>
            <h3 className="font-headline text-lg mb-4">Accepted Payments</h3>
            <div className="flex flex-wrap gap-2">
                <div className="bg-white p-2 rounded-md shadow-md"><img src="https://placehold.co/40x25" alt="Visa" data-ai-hint="visa logo" /></div>
                <div className="bg-white p-2 rounded-md shadow-md"><img src="https://placehold.co/40x25" alt="Mastercard" data-ai-hint="mastercard logo" /></div>
                <div className="bg-white p-2 rounded-md shadow-md"><img src="https://placehold.co/40x25" alt="UPI" data-ai-hint="upi logo" /></div>
                <div className="bg-white p-2 rounded-md shadow-md"><img src="https://placehold.co/40x25" alt="Paytm" data-ai-hint="paytm logo" /></div>
            </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 text-center text-sm">
          &copy; {currentYear} Cj.Drk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
