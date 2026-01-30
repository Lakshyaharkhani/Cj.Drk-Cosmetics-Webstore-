import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';
import { isValidHttpUrl } from '../lib/utils';

interface ExploreProps {
  products: Product[];
}

const ExploreItem: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothImageY = useSpring(imageY, springConfig);
  const smoothTextY = useSpring(textY, springConfig);
  
  const accentColor = product.accentColor || '#A3B18A';
  const imageUrl = (Array.isArray(product.images) && product.images.length > 0 && isValidHttpUrl(product.images[0])) ? product.images[0] : 'https://placehold.co/600x600';

  return (
    <div 
      ref={ref}
      className="h-screen w-full snap-center shrink-0 flex items-center justify-center relative overflow-hidden bg-[#DAD7CD] border-b border-[#1A1A1A]/5"
    >
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at ${index % 2 === 0 ? '70%' : '30%'} 50%, ${accentColor}33, transparent 70%)` 
        }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 h-full px-6 pt-20 pb-10 md:py-0">
        
        <motion.div 
          style={{ y: smoothImageY }}
          className="w-full md:w-[45%] aspect-square md:aspect-[4/5] max-h-[50vh] md:max-h-[70vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative order-1 group cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          
          <div className="absolute top-6 right-6 bg-[#1A1A1A]/90 backdrop-blur-sm text-white px-5 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
            {product.category_id}
          </div>
        </motion.div>
        
        <motion.div 
          style={{ y: smoothTextY }}
          className="w-full md:w-[32rem] bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-xl flex flex-col items-start text-left order-2 shrink-0 border border-white/40"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-6 leading-[1.1]">
              {product.name}
            </h2>
            
            <p className="text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed mb-10 font-light">
              {product.description}
            </p>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              className="w-full bg-[#1A1A1A] text-[#DAD7CD] py-4 px-8 rounded-xl font-medium hover:bg-[#3A5A40] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3 group"
            >
              Shop <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

const Explore: React.FC<ExploreProps> = ({ products }) => {
  return (
    <div className="h-screen w-full bg-[#DAD7CD] overflow-y-scroll snap-y snap-mandatory no-scrollbar relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="fixed top-24 inset-x-0 text-center z-0 pointer-events-none opacity-40 mix-blend-multiply">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A1A1A]">Swipe to Discover</p>
      </div>

      {products.map((product, index) => (
        <ExploreItem key={product.id} product={product} index={index} />
      ))}
      
      <div className="h-40 snap-center flex flex-col items-center justify-center text-[#1A1A1A]/40 gap-4">
        <div className="w-px h-12 bg-[#1A1A1A]/20"></div>
        <p className="text-sm font-serif italic">End of Catalogue</p>
      </div>
    </div>
  );
};

export default Explore;
