import { getProductById, getProducts } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ProductCard from '@/components/ProductCard';
import RelatedProducts from '@/components/RelatedProducts';
import ProductDetails from '@/components/ProductDetails';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const otherProducts = getProducts().filter(p => p.id !== product.id && p.categorySlug === product.categorySlug).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={product.images[0]}
              alt={product.name}
              data-ai-hint={`${product.category} product`}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <div key={index} className="aspect-square w-full overflow-hidden rounded-lg border">
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

      {/* Related Products Section */}
      <div className="mt-16">
        <h3 className="font-headline text-3xl mb-8">You Might Also Like</h3>
        <RelatedProducts productDescription={product.description} productCategory={product.category} currentProductId={product.id} />
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
            {/* Mock Reviews */}
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
