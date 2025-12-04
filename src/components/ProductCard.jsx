
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useCart } from '../context/CartContext';
import { Skeleton } from './ui/skeleton';
import { cn } from '../lib/utils';
import ProductCardSkeleton from './ProductCardSkeleton';


export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [isLoading, setIsLoading] = useState(true);

  if (!product) {
    return <ProductCardSkeleton />;
  }
  
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block aspect-square relative">
          {isLoading && <Skeleton className="absolute inset-0" />}
          <Image
            src={product.images[0]}
            alt={product.name}
            data-ai-hint={`${product.category} product`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              'object-cover transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 h-14 font-body text-lg font-bold leading-tight">
          <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating} ({product.reviewCount})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div>
          <span className="text-xl font-bold">Rs {product.price}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">Rs {product.originalPrice}</span>
          )}
        </div>
        <Button size="icon" variant="outline" onClick={() => addToCart(product)}>
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
