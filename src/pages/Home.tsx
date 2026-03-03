
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { isValidHttpUrl } from '../lib/utils';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const parallaxImage1Src = products.length > 0 && products[0].images.length > 0 ? products[0].images[0] : 'https://placehold.co/400x600';
  const parallaxImage2Src = products.length > 1 && products[1].images.length > 0 ? products[1].images[0] : 'https://placehold.co/400x600';

  const parallaxImage1 = isValidHttpUrl(parallaxImage1Src) ? parallaxImage1Src : 'https://placehold.co/400x600';
  const parallaxImage2 = isValidHttpUrl(parallaxImage2Src) ? parallaxImage2Src : 'https://placehold.co/400x600';
  
  const featuredProducts = products.slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full bg-brand-dark text-brand-cream"
    >
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#111111] z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h2 className="text-brand-cream/60 uppercase tracking-[0.3em] text-xs md:text-sm mb-6 font-medium">Est. 2024</h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-brand-cream font-medium mb-8 leading-tight">
              Nature’s<br />Chemistry
            </h1>
            <p className="text-brand-cream/60 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              CJ DRK Cosmetic ™ bridges the gap between raw earth and clinical efficacy. 
              Small-batch, cold-pressed skincare for the modern purist.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#DAD7CD] text-[#1A1A1A] rounded-full font-medium hover:bg-white transition-all transform hover:scale-105"
            >
              Shop Collection <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-dark border-t border-brand-cream/10 py-6 overflow-hidden whitespace-nowrap relative z-20">
        <div className="animate-marquee inline-block">
          <span className="text-4xl md:text-6xl font-serif text-transparent stroke-text-light font-bold px-4 text-brand-cream/10">
            PURE • ORGANIC • COLD PRESSED • CRUELTY FREE • SUSTAINABLE • 
          </span>
          <span className="text-4xl md:text-6xl font-serif text-transparent stroke-text-light font-bold px-4 text-brand-cream/10">
            PURE • ORGANIC • COLD PRESSED • CRUELTY FREE • SUSTAINABLE • 
          </span>
        </div>
      </section>

      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center text-brand-cream mb-12"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => {
              const imageUrl = (Array.isArray(product.images) && product.images.length > 0 && isValidHttpUrl(product.images[0])) ? product.images[0] : 'https://placehold.co/400x400';
              return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group rounded-3xl overflow-hidden bg-brand-dark shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <Link to={`/product/${product.id}`} className="block h-[400px] w-full">
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-xl font-serif text-white font-medium mb-1">{product.name}</h3>
                    <p className="text-white/80">${product.price.toFixed(2)}</p>
                  </div>
                  <img 
                    src={imageUrl} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                </Link>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#1A1A1A] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif text-brand-cream"
            >
              The Science of <span className="italic text-brand-sage">Slow Beauty</span>
            </motion.h2>
            <p className="text-lg text-brand-cream/70 leading-relaxed">
              We believe in the power of time. Our ingredients are macerated for weeks, not hours, allowing the full spectrum of nutrients to infuse into our oils. No heat, no shortcuts.
            </p>
            <Link to="/explore" className="inline-block text-brand-cream border-b border-brand-cream pb-1 hover:text-brand-sage hover:border-brand-sage transition-colors">
              Explore our process
            </Link>
          </div>
          
          <div className="relative h-[600px] w-full">
            <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl z-10 border border-brand-cream/10">
              <img 
                src={parallaxImage2} 
                alt="Product visual 1" 
                className="w-full h-full object-cover opacity-90"
              />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-[#1A1A1A]">
              <img 
                src={parallaxImage1} 
                alt="Product visual 2" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <div className="h-24 bg-[#1A1A1A]"></div>
    </motion.div>
  );
};

export default Home;
