import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, Star, ShieldCheck } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirebase } from '../firebase/FirebaseProvider';
import { Product } from '../types';
import { isValidHttpUrl } from '../lib/utils';

interface ProductDetailsProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const { firestore } = useFirebase();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [openSection, setOpenSection] = useState<string | null>('ingredients');
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!firestore || !id) return;
    setLoading(true);
    const getProduct = async () => {
      const docRef = doc(firestore, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ ...docSnap.data(), id: docSnap.id } as Product);
      }
      setLoading(false);
    };
    getProduct();
  }, [firestore, id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 2000);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  
  if (loading) return <div className="h-screen flex items-center justify-center bg-brand-cream">Loading product...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center bg-brand-cream">Product not found</div>;

  const imageUrl = (Array.isArray(product.images) && product.images.length > 0 && isValidHttpUrl(product.images[0])) ? product.images[0] : 'https://placehold.co/600x600';

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-20 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          <div className="relative h-fit lg:sticky lg:top-32">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white relative">
              <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-green" />
                <span className="text-xs font-bold text-brand-dark">Certified Organic</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-brand-sage font-bold uppercase tracking-widest text-sm">{product.category_id}</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mt-2 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-brand-dark/50">(128 Reviews)</span>
              </div>

              <p className="text-xl font-medium text-brand-dark mb-8">${product.price.toFixed(2)}</p>
              
              <p className="text-brand-dark/80 leading-relaxed text-lg mb-10">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-4 border border-brand-dark/10 rounded-full p-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-full hover:bg-black/5 transition-colors"><Minus size={16} /></button>
                  <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-full hover:bg-black/5 transition-colors"><Plus size={16} /></button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isAdded 
                      ? 'bg-brand-green text-white' 
                      : 'bg-brand-dark text-white hover:bg-brand-green hover:shadow-lg'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isAdded ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={24} /> Added
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>


              <div className="mt-12 border-t border-brand-dark/10 divide-y divide-brand-dark/10">
                
                <div className="py-4">
                  <button 
                    onClick={() => toggleSection('ingredients')}
                    className="flex justify-between w-full text-left font-serif font-bold text-lg text-brand-dark items-center group"
                  >
                    Ingredients
                    <div className="bg-white/50 p-1 rounded-full group-hover:bg-white transition-colors">
                      {openSection === 'ingredients' ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openSection === 'ingredients' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="pt-4 pb-2 space-y-2 text-brand-dark/70">
                          {(product.tags || []).map((ing, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-sage shrink-0"></span>
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="py-4">
                  <button 
                    onClick={() => toggleSection('shipping')}
                    className="flex justify-between w-full text-left font-serif font-bold text-lg text-brand-dark items-center group"
                  >
                    Shipping & Returns
                    <div className="bg-white/50 p-1 rounded-full group-hover:bg-white transition-colors">
                      {openSection === 'shipping' ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openSection === 'shipping' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                         <p className="pt-4 pb-2 text-brand-dark/70">Free worldwide shipping on orders over $100. Returns accepted within 30 days for unopened products.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
