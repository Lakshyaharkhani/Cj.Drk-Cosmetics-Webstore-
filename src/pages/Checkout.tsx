import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../firebase/FirebaseProvider';
import { CartItem } from '../types';
import { Check, Loader } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { isValidHttpUrl } from '../lib/utils';

interface CheckoutProps {
  cartItems: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const { firestore, user } = useFirebase();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user) {
      alert("You must be logged in to place an order.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(firestore, 'orders'), {
        userId: user.uid,
        items: cartItems.map(({ id, name, price, image, quantity }) => ({ productId: id, name, price, image, quantity })), // Storing a leaner version
        totalAmount: total,
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zip: formData.zip
        },
        status: 'pending',
        createdAt: serverTimestamp()
      });

      await clearCart();
      setIsSubmitting(false);
      setIsSuccess(true);
      
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("There was an error placing your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Order Confirmed</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Thank you for your purchase. We've sent a confirmation email to <span className="font-semibold text-brand-dark">{formData.email}</span>.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-brand-dark text-white rounded-full font-bold hover:bg-brand-green transition-colors"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-white"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-brand-dark mb-8 text-center">Secure Checkout</h1>
        
        {cartItems.length > 0 ? (
          <div className="space-y-8">
            <div className="bg-brand-cream/30 p-6 rounded-2xl">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => {
                  const imageUrl = isValidHttpUrl(item.image) ? item.image : 'https://placehold.co/400x400';
                  return (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-md overflow-hidden shrink-0">
                          <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-brand-dark/10 mt-6 pt-4 flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green transition-colors" 
                  placeholder="Jane Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green transition-colors" 
                  placeholder="you@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-2">Shipping Address</label>
                <input 
                  type="text" 
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green mb-3 transition-colors" 
                  placeholder="Street Address" 
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green transition-colors" 
                    placeholder="City" 
                  />
                  <input 
                    type="text" 
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green transition-colors" 
                    placeholder="ZIP Code" 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || !user}
                className="w-full py-5 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-green transition-colors mt-8 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <><Loader className="animate-spin" size={20} /> Processing...</> : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p className="mb-6">Your cart is empty.</p>
            <button 
              onClick={() => navigate('/shop')}
              className="text-brand-green hover:underline font-medium"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Checkout;
