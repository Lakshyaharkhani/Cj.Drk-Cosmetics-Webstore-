
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import NewProductCard from '../components/NewProductCard';
import placeholderImages from '../lib/placeholder-images.json';

const valueProps = [
  { icon: 'water_drop', title: 'Cold Pressed', description: 'Retaining all natural nutrients' },
  { icon: 'pets', title: 'Cruelty-Free', description: 'Never tested on animals' },
  { icon: 'spa', title: '100% Vegan', description: 'Plant-based ingredients only' },
  { icon: 'recycling', title: 'Plastic-Free', description: 'Sustainable packaging' }
];

export default function Home() {
  const { hero, userAvatars, categories, bestSellers, testimonial } = placeholderImages;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">
                <span className="material-symbols-outlined text-sm">eco</span>
                <span className="text-xs font-bold uppercase tracking-wide">100% Organic Ingredients</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                Cj.Drk Cosmetic Store, <br />
                <span className="text-primary">Cold Pressed</span> for You.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                Experience the luxury of handmade skincare. Our artisanal soaps and serums are crafted in small batches to preserve their natural potency.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-lg shadow-primary/30">
                  <Link href="/products">Shop Collection</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold text-sm">
                  <Link href="/about">Read Our Story</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                <div className="flex -space-x-3">
                  {userAvatars.map((avatar, index) => (
                    <Image key={index} src={avatar.src} alt={avatar.alt} data-ai-hint={avatar.hint} width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-sm fill-current">star</span>)}
                  </div>
                  <span className="text-xs font-medium text-gray-500">Trusted by 2,000+ customers</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[1.5rem] shadow-2xl overflow-hidden">
                <Image src={hero.main.src} alt={hero.main.alt} data-ai-hint={hero.main.hint} fill objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-8 left-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-5 py-3 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800 transform transition-transform hover:scale-105">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{hero.badge.title}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{hero.badge.productName}</p>
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
            <h2 className="text-3xl font-bold tracking-tight mb-4">Crowd Favorites</h2>
            <p className="text-gray-500">Our community's most loved products, crafted for daily rituals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <NewProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Testimonial Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Newsletter</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Inner Circle</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                Get 10% off your first order plus exclusive tips on natural skincare and early access to new batches.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input className="flex-1 rounded-md border-transparent bg-white dark:bg-gray-700 px-4 py-3 text-base focus:border-primary focus:ring-primary dark:text-white dark:placeholder-gray-400" placeholder="Enter your email" type="email" />
                <Button type="submit" className="font-bold whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-3">We respect your privacy. Unsubscribe at any time.</p>
            </div>
            <div className="bg-white dark:bg-[#181311] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-primary text-4xl mb-4 font-serif">"</div>
              <p className="text-lg font-medium leading-relaxed italic mb-6">
                I've never used a soap that left my skin feeling this soft. The scent is incredibly natural, not overpowering like synthetic brands. Truly a spa experience at home.
              </p>
              <div className="flex items-center gap-4">
                <Image src={testimonial.src} alt={testimonial.alt} data-ai-hint={testimonial.hint} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-sm">Elena Rodriguez</p>
                  <p className="text-xs text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
