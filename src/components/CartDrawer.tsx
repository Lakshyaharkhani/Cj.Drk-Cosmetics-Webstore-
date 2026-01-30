import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../firebase/FirebaseProvider';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }) => {
  const { user } = useFirebase();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream z-50 shadow-2xl border-l border-white/20 flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-brand-dark/10">
              <h2 className="font-serif text-2xl font-bold">Your Ritual</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-dark/50">
                  <p className="text-lg">Your cart is empty.</p>
                  <button onClick={onClose} className="mt-4 text-brand-green font-medium hover:underline">Start Shopping</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-semibold leading-tight mb-1">{item.name}</h3>
                        <p className="text-sm text-brand-dark/60">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-white/50 rounded-full px-2 py-1 border border-brand-dark/5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-brand-dark/10 rounded-full transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-brand-dark/10 rounded-full transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-brand-accent text-xs hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-brand-dark/10 bg-white/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4 text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link 
                to={user ? "/checkout" : "/auth"}
                onClick={onClose}
                className={`block w-full py-4 bg-brand-dark text-white text-center rounded-lg font-medium hover:bg-brand-green transition-colors ${cartItems.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
              >
                {user ? "Proceed to Checkout" : "Login to Continue"}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
