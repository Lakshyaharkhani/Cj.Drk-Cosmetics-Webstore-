
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import React from 'react';

interface Product {
    name: string;
    description: string;
    price: number;
    tag: string | null;
    image: {
        src: string;
        alt: string;
        hint: string;
    };
}

interface NewProductCardProps {
    product: Product;
}

export default function NewProductCard({ product }: NewProductCardProps) {
  const { addToCart } = useCart();
  const { name, description, price, image, tag } = product;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation
    // The product from placeholder-images.json is simplified.
    // We create a mock product object that has the fields expected by addToCart.
    const cartProduct = {
      id: name, // Use name as a temporary unique ID
      name,
      price,
      images: [image.src], // Create an images array
      brand: 'Cj.Drk Cosmetic Store', // Mock brand
      ...product, // Include other properties like description
    };
    addToCart(cartProduct);
  };

  return (
    <div className="group flex flex-col">
       <Link href="/products">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
            {tag && (
            <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${tag === 'Best Seller' ? 'bg-primary' : 'bg-gray-900'}`}>
                {tag}
            </span>
            )}
            <Image 
                src={image.src} 
                alt={image.alt}
                data-ai-hint={image.hint}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 object-cover"
            />
            <Button 
                variant="default"
                size="icon"
                className="absolute bottom-4 right-4 bg-white text-primary p-2 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white"
                onClick={handleAddToCart}
            >
                <span className="material-symbols-outlined block">add_shopping_cart</span>
            </Button>
        </div>
      </Link>
      <Link href="/products">
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{name}</h3>
      </Link>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <p className="text-primary font-bold">${price.toFixed(2)}</p>
    </div>
  );
}

    