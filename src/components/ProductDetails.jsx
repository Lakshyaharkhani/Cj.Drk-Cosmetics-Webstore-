
'use client';

import { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  }

  return (
    <div>
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <h1 className="font-headline text-4xl lg:text-5xl">{product.name}</h1>
        <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            <span className={`text-sm font-semibold ${product.stockStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
            {product.stockStatus}
            </span>
        </div>

        <div className="mt-6">
            <span className="text-4xl font-bold">₹{product.price}</span>
            {product.originalPrice && (
            <span className="ml-3 text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
        </div>

        <div className="mt-8">
            <h3 className="font-bold text-lg mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {product.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
        </div>

        <div className="mt-8 flex items-center gap-4">
            <p className="font-bold">Quantity:</p>
            <div className="flex items-center rounded-md border">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
            </Button>
            </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button size="lg" onClick={handleAddToCart}>
                Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleBuyNow}>
                Buy Now
            </Button>
        </div>
    </div>
  );
}
