
'use client';

import Link from 'next/link';
import { getPolicies } from '@/lib/data';
import { useState, useEffect } from 'react';

export default function Footer() {
    const policies = getPolicies();
    const [currentYear, setCurrentYear] = useState(null);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-headline text-xl mb-4">ElectroCart</h3>
          <p className="text-sm">Your go-to for tech essentials. We provide quality electronics with fast, reliable shipping.</p>
        </div>
        <div>
          <h3 className="font-headline text-lg mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=tws-earbuds" className="hover:text-primary transition-colors">TWS Earbuds</Link></li>
            <li><Link href="/products?category=power-banks" className="hover:text-primary transition-colors">Power Banks</Link></li>
            <li><Link href="/products?category=usb-cables" className="hover:text-primary transition-colors">USB Cables</Link></li>
            <li><Link href="/products?category=mobile-covers" className="hover:text-primary transition-colors">Mobile Covers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-lg mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            {policies.map(policy => (
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
          &copy; {currentYear || new Date().getFullYear()} ElectroCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
