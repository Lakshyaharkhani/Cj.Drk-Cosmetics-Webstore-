'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-muted/20 py-20 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="font-headline text-2xl">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <ul className="divide-y">
                    {cartItems.map(item => (
                        <li key={item.id} className="flex items-center gap-6 p-6">
                        <Image
                            src={item.images[0]}
                            alt={item.name}
                            data-ai-hint="product"
                            width={100}
                            height={100}
                            className="h-24 w-24 rounded-md object-cover"
                        />
                        <div className="flex-grow">
                            <Link href={`/product/${item.id}`} className="font-bold hover:text-primary">{item.name}</Link>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            <div className="mt-2 flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="h-8 w-14 text-center"
                            />
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive mt-2" onClick={() => removeFromCart(item.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="link" className="text-muted-foreground">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
