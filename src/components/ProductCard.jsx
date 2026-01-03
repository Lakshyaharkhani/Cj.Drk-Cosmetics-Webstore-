
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, name, price, originalPrice, images, rating, reviewCount, category, stockStatus } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg">
      <Link href={`/product/${id}`} className="relative block">
        <div className="aspect-square w-full overflow-hidden">
          <Image
            src={images[0]}
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
