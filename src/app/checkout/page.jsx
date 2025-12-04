
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/context/CartContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { CreditCard, Truck } from 'lucide-react';
import React from 'react';

const shippingSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  address: z.string().min(5, { message: 'Address is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  pincode: z.string().length(6, { message: 'Pincode must be 6 digits.' }),
  state: z.string().min(2, { message: 'State is required.' }),
});

const paymentSchema = z.object({
    paymentMethod: z.enum(['card', 'upi', 'cod'], {
        required_error: "You need to select a payment method."
    })
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = React.useState('shipping');

  const shippingForm = useForm({
    resolver: zodResolver(shippingSchema),
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
  });

  const onShippingSubmit = (data) => {
    console.log('Shipping details:', data);
    setStep('payment');
  };

  const onPaymentSubmit = (data) => {
    console.log('Payment method:', data.paymentMethod);
    toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully.",
    });
    clearCart();
    router.push('/order-confirmation');
  }

  if (cartCount === 0 && typeof window !== 'undefined') {
    router.push('/products');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="lg:order-last">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <Image src={item.images[0]} alt={item.name} width={64} height={64} className="h-16 w-16 rounded-md object-cover" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-medium">Rs {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rs {cartTotal.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>Rs {cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div>
            {step === 'shipping' && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Truck className="h-6 w-6" />
                            <CardTitle className="font-headline text-2xl">Shipping Information</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...shippingForm}>
                            <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-6">
                                <FormField control={shippingForm.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} placeholder="you@example.com" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={shippingForm.control} name="fullName" render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} placeholder="Your Name" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={shippingForm.control} name="address" render={({ field }) => (
                                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} placeholder="123 Main St" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={shippingForm.control} name="city" render={({ field }) => (
                                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={shippingForm.control} name="pincode" render={({ field }) => (
                                        <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                <FormField control={shippingForm.control} name="state" render={({ field }) => (
                                    <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <Button type="submit" size="lg" className="w-full">Continue to Payment</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}

            {step === 'payment' && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-6 w-6" />
                            <CardTitle className="font-headline text-2xl">Payment Method</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...paymentForm}>
                            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                                <FormField control={paymentForm.control} name="paymentMethod" render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl><RadioGroupItem value="card" /></FormControl>
                                                    <FormLabel className="font-normal w-full">Credit/Debit Card</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl><RadioGroupItem value="upi" /></FormControl>
                                                    <FormLabel className="font-normal w-full">UPI</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl><RadioGroupItem value="cod" /></FormControl>
                                                    <FormLabel className="font-normal w-full">Cash on Delivery</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <div className='flex gap-4'>
                                    <Button variant="outline" size="lg" className="w-full" onClick={() => setStep('shipping')}>Back to Shipping</Button>
                                    <Button type="submit" size="lg" className="w-full">Place Order</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
