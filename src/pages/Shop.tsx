import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ShopProps {
  products: Product[];
}

function isValidHttpUrl(string: string | undefined | null): boolean {
  if (!string) return false;
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

const Shop: React.FC<ShopProps> = ({ products }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 px-6 md:px-12 pb-32 bg-brand-cream text-brand-dark"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-4">The Collection</h1>
          <p className="text-brand-dark/60 max-w-xl mx-auto">Small-batch skincare crafted with intention. Browse the full apothecary below.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[400px]">
          {products.map((product, index) => {
            const isLarge = index === 0 || index === 5;
            const spanClass = isLarge ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1";

            const imageUrl = (Array.isArray(product.images) && product.images.length > 0 && isValidHttpUrl(product.images[0])) ? product.images[0] : 'https://placehold.co/400x400';
            const shadowColor = product.accentColor ? `shadow-[0_10px_30px_-5px_${product.accentColor}]` : 'shadow-lg';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group rounded-3xl overflow-hidden bg-white ${spanClass} hover:${shadowColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                <Link to={`/product/${product.id}`} className="block h-full w-full">
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-bold text-brand-sage uppercase tracking-wider mb-1">{product.category_id}</span>
                    <h3 className="text-xl font-serif text-white font-medium">{product.name}</h3>
                    <p className="text-white/80 mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  
                  <img 
                    src={imageUrl} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-brand-dark group-hover:opacity-0 transition-opacity">
                    {product.name}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
