import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getProducts, getCategories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = getProducts().slice(0, 8);
  const categories = getCategories();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://placehold.co/1600x900"
          alt="Modern electronics on a clean background"
          data-ai-hint="modern electronics"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center text-white">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl">Tech Essentials, Delivered.</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            From power banks to earbuds, find the perfect gear to power your life. Fast, reliable, and right at your fingertips.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105">
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-baseline mb-8">
            <h2 className="font-headline text-4xl">Featured Products</h2>
            <Button variant="link" asChild>
                <Link href="/products" className="text-primary hover:text-accent">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </Button>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1 h-full">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="font-headline text-4xl mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`} className="group">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardContent className="p-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    data-ai-hint={category.name}
                    width={400}
                    height={300}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-headline text-2xl text-center">{category.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
