
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '../../components/ui/button';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Your Shopping Bag</h1>
          
          {cartItems.length === 0 ? (
            <div className="py-20 text-center border rounded-xl border-dashed">
              <p className="text-gray-500 mb-6">Your bag is empty.</p>
              <Link href="/products" className="text-primary font-bold hover:underline">Explore Products</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {cartItems.map(item => {
                const imageUrl = (Array.isArray(item.images) && item.images.length > 0 && typeof item.images[0] === 'string' && item.images[0]) 
                  ? item.images[0] 
                  : 'https://placehold.co/128x128';

                return (
                  <div key={item.id} className="flex gap-6 py-8">
                    <div className="shrink-0 w-24 h-24 sm:w-32 rounded-xl overflow-hidden bg-gray-100">
                      <Image 
                        src={imageUrl} 
                        alt={item.name} 
                        width={128}
                        height={128}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold leading-tight">{item.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{item.category_id}</p>
                        </div>
                        <p className="text-lg font-semibold">Rs {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="size-8 flex items-center justify-center hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="w-10 text-center font-semibold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="size-8 flex items-center justify-center hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">delete</span> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 border-b pb-6 dark:border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">Rs {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-400 text-xs italic">Calculated next step</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-8">
                <span className="text-base font-bold">Total</span>
                <span className="text-3xl font-extrabold text-primary">Rs {cartTotal.toFixed(2)}</span>
              </div>
              <Button 
                asChild
                size="lg"
                className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Link href={cartItems.length > 0 ? "/checkout" : "#"}>
                  Checkout <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
