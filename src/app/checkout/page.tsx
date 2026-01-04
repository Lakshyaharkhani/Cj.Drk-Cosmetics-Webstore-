
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/context/CartContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { CreditCard, Truck, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const shippingSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  address: z.string().min(5, { message: 'Address is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  pincode: z.string().length(6, { message: 'Pincode must be 6 digits.' }),
  state: z.string().min(2, { message: 'State is required.' }),
});

const paymentSchema = z.object({
    cardNumber: z.string().min(16, "Card number must be 16 digits.").max(16, "Card number must be 16 digits."),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/, "Expiry date must be in MM/YY format."),
    cvc: z.string().min(3, "CVC must be 3 digits.").max(4, "CVC can be atmost 4 digits."),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, cartCount } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingFormValues | null>(null);

  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: '',
      fullName: '',
      address: '',
      city: '',
      pincode: '',
      state: '',
    }
  });
  
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
    }
  });


  const onShippingSubmit = (data: ShippingFormValues) => {
    setShippingInfo(data);
    setStep('payment');
  };

  const onPaymentSubmit = (data: PaymentFormValues) => {
    setIsProcessing(true);
    // Simulate bank verification delay
    setTimeout(() => {
        setIsProcessing(false);
        toast({
            title: "Order Placed!",
            description: "Your order has been placed successfully. This was a simulation.",
        });
        clearCart();
        router.push('/order-confirmation');
    }, 2500);
  }

  useEffect(() => {
    if (cartCount === 0 && !isProcessing) {
      router.push('/products');
    }
  }, [cartCount, router, isProcessing]);

  if (cartCount === 0) {
    return null;
  }
  
  const shippingCost = step === 'shipping' ? 0 : 50;

  return (
    <>
    {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <p>Verifying Transaction...</p>
            </div>
        </div>
    )}
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="lg:order-last">
            <Card className="bg-gray-50 dark:bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                             <div key={item.id} className="flex gap-4 items-center">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-white">
                                    <Image src={item.images[0]} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] size-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                                </div>
                                <div className="flex-1"><p className="text-sm font-bold truncate">{item.name}</p></div>
                                <p className="font-bold">Rs {(item.price * item.quantity).toFixed(2)}</p>
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
                            <span>{step === 'shipping' ? '--' : `Rs ${shippingCost.toFixed(2)}`}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>Rs {(cartTotal + shippingCost).toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div>
            <nav className="flex items-center gap-2 text-sm mb-8">
                <Link href="/cart" className="text-primary font-medium">Cart</Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className={step === 'shipping' ? 'font-bold' : 'text-gray-500'}>Information</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className={step === 'payment' ? 'font-bold' : 'text-gray-500'}>Payment</span>
            </nav>
            
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
                                <div className="flex justify-between items-center pt-6">
                                     <Link href="/cart" className="text-primary font-bold">Return to cart</Link>
                                     <Button type="submit" size="lg">Continue to Payment</Button>
                                </div>
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
                        <p className="text-gray-500 text-sm">All transactions are secure and encrypted.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl divide-y dark:border-gray-800 mb-6">
                            {shippingInfo && (
                                <>
                                <div className="p-4 flex justify-between items-center"><span className="text-gray-500">Contact</span><span>{shippingInfo.email}</span><Button variant="link" size="sm" onClick={() => setStep('shipping')}>Change</Button></div>
                                <div className="p-4 flex justify-between items-center"><span className="text-gray-500">Ship to</span><span className="text-right">{shippingInfo.address}, {shippingInfo.city}</span><Button variant="link" size="sm" onClick={() => setStep('shipping')}>Change</Button></div>
                                </>
                            )}
                        </div>

                        <Form {...paymentForm}>
                            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                                 <div className="border border-primary rounded-xl overflow-hidden">
                                    <div className="bg-primary/5 p-4 flex items-center justify-between">
                                        <span className="font-bold">Credit Card</span>
                                        <div className="flex gap-2"><CreditCard className="h-5 w-5"/></div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <FormField control={paymentForm.control} name="cardNumber" render={({ field }) => (
                                            <FormItem><FormControl><Input {...field} placeholder="Card number" /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField control={paymentForm.control} name="expiryDate" render={({ field }) => (
                                                <FormItem><FormControl><Input {...field} placeholder="MM / YY" /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={paymentForm.control} name="cvc" render={({ field }) => (
                                                <FormItem><FormControl><Input {...field} placeholder="CVC" /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='flex justify-between items-center pt-6'>
                                    <Button variant="link" onClick={() => setStep('shipping')}>Back to Information</Button>
                                    <Button type="submit" size="lg" disabled={isProcessing}>
                                        {isProcessing ? 'Processing...' : `Pay Rs ${(cartTotal + shippingCost).toFixed(2)}`}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
    </>
  );
}
