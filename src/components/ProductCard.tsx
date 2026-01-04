
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import React from 'react';
import { Product } from '@/lib/types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { id, name, price, originalPrice, image, rating, reviews, category } = product;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const imageUrl = image && typeof image === 'string' ? image : 'https://picsum.photos/seed/placeholder/400/400';
  const effectiveRating = rating || 0;
  const effectiveReviews = reviews || 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg h-full">
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
        {product.isBestSeller && (
             <Badge variant="default" className="absolute top-3 left-3 bg-primary">Best Seller</Badge>
        )}
         {originalPrice && (
          <Badge className="absolute top-3 right-3 bg-red-500">Sale</Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-lg flex-grow">
          <Link href={`/product/${id}`}>{name}</Link>
        </h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            {effectiveRating}
          </span>
          <span>({effectiveReviews} reviews)</span>
        </div>
        <div className="mt-4">
          <p className="text-xl font-bold">
            Rs {price.toFixed(2)}
            {originalPrice && <span className="ml-2 text-base font-normal text-muted-foreground line-through">Rs {originalPrice.toFixed(2)}</span>}
          </p>
        </div>
        <div className="mt-4">
          <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}

    