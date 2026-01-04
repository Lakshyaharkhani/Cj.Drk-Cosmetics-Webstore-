
import './globals.css';
import { Toaster } from '../components/ui/toaster';
import { CartProvider } from '../context/CartContext';
import { FirebaseClientProvider } from '../firebase';
import NewHeader from '../components/NewHeader';
import NewFooter from '../components/NewFooter';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Cj.Drk Cosmetic Store - Handmade Soaps & Skincare",
  description: 'Handcrafted organic skincare made with love and intention. Sustainable, ethical, and pure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-display antialiased bg-background-light dark:bg-background-dark text-[#181311] dark:text-[#f4f2f0]">
        <FirebaseClientProvider>
          <CartProvider>
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
              <NewHeader />
              <main className="flex-grow">{children}</main>
              <NewFooter />
            </div>
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

    