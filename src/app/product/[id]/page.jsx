
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';
import ProductDetails from '../../../components/ProductDetails';
import { Star } from 'lucide-react';
import ProductLoadingPage from './loading';
import { useDoc, useFirestore, useMemoFirebase } from '../../../firebase';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';

export default function ProductPage() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const firestore = useFirestore();

  const productRef = useMemoFirebase(() => productId ? doc(firestore, 'products', productId) : null, [firestore, productId]);
  const { data: product, isLoading } = useDoc(productRef);

  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return <ProductLoadingPage />;
  }

  if (!product) {
    notFound();
  }

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              data-ai-hint={`${product.category} product`}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              key={selectedImage} // Force re-render on image change for transition
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <div 
                key={index} 
                className={cn(
                  "aspect-square w-full overflow-hidden rounded-lg border-2 cursor-pointer transition-all",
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  data-ai-hint="product detail"
                  width={150}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <ProductDetails product={product} />
      </div>

      {/* Detailed Info Section */}
      <div className="mt-16">
        <Accordion type="single" collapsible defaultValue="description" className="w-full">
            <AccordionItem value="description">
                <AccordionTrigger><h3 className="font-headline text-2xl">Description</h3></AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                    {product.description}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specifications">
                <AccordionTrigger><h3 className="font-headline text-2xl">Specifications</h3></AccordionTrigger>
                <AccordionContent>
                    <table className="w-full text-left">
                        <tbody>
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <tr key={key} className="border-b">
                                    <td className="py-2 pr-4 font-medium">{key}</td>
                                    <td className="py-2">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

       {/* Customer Reviews Section */}
       <div className="mt-16">
        <h3 className="font-headline text-3xl mb-8">Customer Reviews</h3>
        <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-4xl font-bold">
                    {product.rating.toFixed(1)} <Star className="ml-2 h-8 w-8 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-muted-foreground">Based on {product.reviewCount} reviews</p>
            </div>
            {/* Mock Reviews - In a real app, these would come from Firestore */}
            <div className="space-y-6">
                <div className="border-t pt-6">
                    <div className="flex items-center mb-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                        <p className="ml-auto font-medium">Rahul V.</p>
                    </div>
                    <p className="text-muted-foreground">Excellent sound quality and noise cancellation. Worth every penny!</p>
                </div>
                <div className="border-t pt-6">
                    <div className="flex items-center mb-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                        <p className="ml-auto font-medium">Priya S.</p>
                    </div>
                    <p className="text-muted-foreground">Great battery life, but the fit could be a bit more snug for me.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
