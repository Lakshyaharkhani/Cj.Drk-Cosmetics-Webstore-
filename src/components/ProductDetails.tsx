
'use client';

import { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { useCart, Product as CartProduct } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';

interface Product extends DocumentData {
  category: string;
  name: string;
  rating: number;
  reviewCount: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  price: number;
  originalPrice?: number;
  features: string[];
  description: string;
}


interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product as CartProduct, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(product as CartProduct, quantity);
    router.push('/checkout');
  }

  return (
    <div className="flex flex-col gap-8">
        <div className="space-y-4">
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">{product.name}</h1>
            <div className="flex items-center gap-4">
                <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                </div>
                <span className="text-sm font-bold text-gray-400 underline decoration-gray-300 underline-offset-4">{product.reviewCount} verified reviews</span>
            </div>
        </div>

        <div className="flex items-baseline gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
            <span className="text-4xl font-black text-primary">Rs {product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-xl text-gray-400 line-through decoration-red-400/50">Rs {product.originalPrice.toFixed(2)}</span>}
        </div>

        <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{product.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center rounded-2xl border-2 border-gray-100 dark:border-gray-800 h-16 bg-white dark:bg-gray-800 overflow-hidden">
                <Button variant="ghost" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-6 text-gray-400 hover:text-primary transition-colors h-full rounded-none"><Minus className="h-5 w-5" /></Button>
                <span className="w-8 text-center font-black text-lg">{quantity}</span>
                <Button variant="ghost" onClick={() => setQuantity(q => q + 1)} className="px-6 text-gray-400 hover:text-primary transition-colors h-full rounded-none"><Plus className="h-5 w-5" /></Button>
            </div>
            <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl h-16 px-10 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
                <span className="material-symbols-outlined">add_shopping_cart</span> Add to Bag
            </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Fast, Carbon-Neutral Shipping
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                100% Organic Ingredients
            </div>
        </div>
    </div>
  );
}
