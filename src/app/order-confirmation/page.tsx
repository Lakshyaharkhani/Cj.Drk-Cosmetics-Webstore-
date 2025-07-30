import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderConfirmationPage() {
    // In a real app, you'd fetch order details using an ID from the URL
    const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="font-headline text-3xl">Thank You for Your Order!</h1>
            <p className="text-muted-foreground">Your order has been placed successfully.</p>
        </CardHeader>
        <CardContent className="text-center">
            <div className="border-t border-b py-6 my-6">
                <p className="text-muted-foreground">Order Number</p>
                <p className="text-2xl font-bold font-mono mt-1">{orderNumber}</p>
            </div>
            <p className="text-muted-foreground mb-6">You will receive an email confirmation shortly with your order details and tracking information.</p>
            <Button asChild>
                <Link href="/products">Continue Shopping</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
