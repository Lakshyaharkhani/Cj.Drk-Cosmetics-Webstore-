
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';
import { Star, Minus, Plus } from 'lucide-react';
import ProductLoadingPage from './loading';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, DocumentData } from 'firebase/firestore';

function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const rating = product.rating || 0;
  const reviews = product.reviews || 0;

  return (
    <div className="flex flex-col gap-8">
        <div className="space-y-4">
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">{product.name}</h1>
            <div className="flex items-center gap-4">
                <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
                    ))}
                </div>
                <span className="text-sm font-bold text-gray-400 underline decoration-gray-300 underline-offset-4">{reviews} verified reviews</span>
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

export default function ProductPage() {
  const params = useParams();
  const firestore = useFirestore();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const productRef = useMemoFirebase(() => productId ? doc(firestore, 'products', productId) : null, [firestore, productId]);
  const { data: product, isLoading } = useDoc<Product>(productRef);
  
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Reset selected image when product changes
    setSelectedImage(0);
  }, [productId]);


  if (isLoading) {
    return <ProductLoadingPage />;
  }

  if (!product) {
    notFound();
  }
  
  const allImages = [product.image, ...product.thumbnails].filter(Boolean);

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={allImages[selectedImage] || 'https://placehold.co/600x600'}
              alt={product.name}
              data-ai-hint={`${product.category} product`}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              key={selectedImage} // Force re-render on image change for transition
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {allImages.map((img, index) => (
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
            {product.ingredients &&
            <AccordionItem value="ingredients">
                <AccordionTrigger><h3 className="font-headline text-2xl">Ingredients</h3></AccordionTrigger>
                <AccordionContent>
                    <p>{product.ingredients}</p>
                </AccordionContent>
            </AccordionItem>
            }
             {product.scentNotes &&
            <AccordionItem value="scent">
                <AccordionTrigger><h3 className="font-headline text-2xl">Scent Profile</h3></AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-5">
                        <li><strong>Top:</strong> {product.scentNotes.top}</li>
                        <li><strong>Middle:</strong> {product.scentNotes.middle}</li>
                        <li><strong>Base:</strong> {product.scentNotes.base}</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
            }
        </Accordion>
      </div>

       {/* Customer Reviews Section */}
       <div className="mt-16">
        <h3 className="font-headline text-3xl mb-8">Customer Reviews</h3>
        <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-4xl font-bold">
                    {(product.rating || 0).toFixed(1)} <Star className="ml-2 h-8 w-8 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-muted-foreground">Based on {product.reviews || 0} reviews</p>
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
                    <p className="text-muted-foreground">Excellent! Worth every penny!</p>
                </div>
                <div className="border-t pt-6">
                    <div className="flex items-center mb-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                        <p className="ml-auto font-medium">Priya S.</p>
                    </div>
                    <p className="text-muted-foreground">Great, but the fit could be a bit more snug for me.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

    