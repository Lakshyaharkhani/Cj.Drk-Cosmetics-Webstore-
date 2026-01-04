
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import placeholderImages from '../lib/placeholder-images.json';
import { useCollection, useFirestore, useMemoFirebase } from '../firebase';
import { collection, DocumentData } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';

const valueProps = [
  { icon: 'water_drop', title: 'Cold Pressed', description: 'Retaining all natural nutrients' },
  { icon: 'pets', title: 'Cruelty-Free', description: 'Never tested on animals' },
  { icon: 'spa', title: '100% Vegan', description: 'Plant-based ingredients only' },
  { icon: 'recycling', title: 'Plastic-Free', description: 'Sustainable packaging' }
];

interface Product extends DocumentData {
  id: string;
}

export default function Home() {
  const { hero, categories } = placeholderImages;
  
  const firestore = useFirestore();
  const productsRef = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: products } = useCollection<Product>(productsRef);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#181311]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">
                <span className="material-symbols-outlined text-sm">eco</span>
                <span className="text-xs font-bold uppercase tracking-wide">Handcrafted by Cj.Drk</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                Pure Essentials, <br /><span className="text-primary">Cold Pressed</span> for You.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                Cj.Drk brings you the luxury of handmade skincare. Our artisanal soaps and serums are crafted in small batches to preserve their natural potency.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-lg shadow-primary/30">
                  <Link href="/products">Shop Collection</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold text-sm">
                  <Link href="/about">Read Our Story</Link>
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[1.5rem] shadow-2xl overflow-hidden">
                <Image src={hero.main.src} alt={hero.main.alt} data-ai-hint={hero.main.hint} fill objectFit="cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Strip */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1f1a17]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {valueProps.map((prop) => (
              <div key={prop.title} className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full text-primary mb-1">
                  <span className="material-symbols-outlined text-3xl">{prop.icon}</span>
                </div>
                <h3 className="font-bold text-base">{prop.title}</h3>
                <p className="text-xs text-gray-500">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <Link href="/products" className="text-primary font-semibold hover:underline flex items-center gap-1">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/products?category=${category.slug}`} className="group relative block aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
              <Image src={category.src} alt={category.alt} data-ai-hint={category.hint} fill objectFit="cover" className="transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-md group-hover:bg-white group-hover:text-primary transition-colors">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="w-full bg-white dark:bg-[#181311] py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Cj.Drk Favorites</h2>
            <p className="text-gray-500">Our community's most loved products, crafted for daily rituals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products && products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
