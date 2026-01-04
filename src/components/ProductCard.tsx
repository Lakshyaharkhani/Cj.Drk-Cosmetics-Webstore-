
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, Product as CartProduct } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DocumentData } from 'firebase/firestore';
import React from 'react';

interface Product extends DocumentData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { id, name, price, originalPrice, images, rating, reviewCount, category, stockStatus } = product;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product as CartProduct);
  };

  const imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : 'https://picsum.photos/seed/placeholder/400/400';


  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg">
      <Link href={`/product/${id}`} className="relative block">
        <div className="aspect-square w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            data-ai-hint={`${category} product`}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {stockStatus !== 'In Stock' && (
             <Badge variant="destructive" className="absolute top-3 left-3">{stockStatus}</Badge>
        )}
         {originalPrice && (
          <Badge className="absolute top-3 right-3 bg-primary">Sale</Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-lg">
          <Link href={`/product/${id}`}>{name}</Link>
        </h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-base text-yellow-400 fill-current">star</span>
            {rating}
          </span>
          <span>({reviewCount} reviews)</span>
        </div>
        <div className="mt-4 flex-grow">
          <p className="text-xl font-bold">
            Rs {price}
            {originalPrice && <span className="ml-2 text-base font-normal text-muted-foreground line-through">Rs {originalPrice}</span>}
          </p>
        </div>
        <div className="mt-4">
          <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
