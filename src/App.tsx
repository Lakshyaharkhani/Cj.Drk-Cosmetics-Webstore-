import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { collection, doc, onSnapshot, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Explore from './pages/Explore';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Admin from './pages/Admin';

import { useFirebase } from './firebase/FirebaseProvider';
import { CartItem, Product } from './types';
import { isValidHttpUrl } from './lib/utils';

const AnimatedRoutes: React.FC<{
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  clearCart: () => Promise<void>;
}> = ({ products, cartItems, addToCart, clearCart }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/shop" element={<Shop products={products} />} />
        <Route path="/explore" element={<Explore products={products} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const { firestore, user, loading, isAdmin } = useFirebase();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
      setProducts(productsData);
    });
    return () => unsub();
  }, [firestore]);
  
  useEffect(() => {
    if (!firestore || !user) {
      setCartItems([]);
      return;
    }

    const cartRef = doc(firestore, 'carts', user.uid);
    const unsub = onSnapshot(cartRef, async (cartDoc) => {
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        const itemPromises = (cartData.items || []).map(async (item: {productId: string, quantity: number}) => {
          const productDocRef = doc(firestore, 'products', item.productId);
          const productDoc = await getDoc(productDocRef);
          if (productDoc.exists()) {
            const productData = { ...productDoc.data(), id: productDoc.id } as Product;
            const imageUrl = (Array.isArray(productData.images) && productData.images.length > 0 && isValidHttpUrl(productData.images[0])) ? productData.images[0] : 'https://placehold.co/400x400';
            return {
              id: productDoc.id,
              name: productData.name,
              price: productData.price,
              image: imageUrl,
              quantity: item.quantity,
            };
          }
          return null;
        });

        const resolvedItems = (await Promise.all(itemPromises)).filter(Boolean) as CartItem[];
        setCartItems(resolvedItems);
      } else {
        setCartItems([]);
      }
    });

    return () => unsub();
  }, [firestore, user]);

  const addToCart = async (product: Product, quantity: number) => {
    if (!firestore || !user) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const cartRef = doc(firestore, 'carts', user.uid);
    const cartDoc = await getDoc(cartRef);

    const cartItem = {
      productId: product.id,
      quantity,
    };
    
    if (cartDoc.exists()) {
      const items = cartDoc.data().items || [];
      const existingItemIndex = items.findIndex((item: { productId: string }) => item.productId === product.id);

      if (existingItemIndex > -1) {
        const newItems = [...items];
        newItems[existingItemIndex].quantity += quantity;
        await updateDoc(cartRef, { items: newItems, updatedAt: new Date() });
      } else {
        await updateDoc(cartRef, { items: arrayUnion(cartItem), updatedAt: new Date() });
      }
    } else {
      await setDoc(cartRef, { userId: user.uid, items: [cartItem], updatedAt: new Date() });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!firestore || !user) return;
    const cartRef = doc(firestore, 'carts', user.uid);
    const cartDoc = await getDoc(cartRef);
    if (cartDoc.exists()) {
      const items = cartDoc.data().items || [];
      const itemToRemove = items.find((item: { productId: string }) => item.productId === productId);
      if (itemToRemove) {
        await updateDoc(cartRef, { items: arrayRemove(itemToRemove), updatedAt: new Date() });
      }
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!firestore || !user) return;
    const cartRef = doc(firestore, 'carts', user.uid);
    const cartDoc = await getDoc(cartRef);
    if (!cartDoc.exists()) return;

    const items = cartDoc.data().items || [];
    const itemIndex = items.findIndex((item: { productId: string }) => item.productId === productId);

    if (itemIndex > -1) {
        const newItems = [...items];
        if (newQuantity < 1) {
            newItems.splice(itemIndex, 1);
        } else {
            newItems[itemIndex].quantity = newQuantity;
        }
        await updateDoc(cartRef, { items: newItems, updatedAt: new Date() });
    }
  };
  
  const clearCart = async () => {
    if (!firestore || !user) return;
    const cartRef = doc(firestore, 'carts', user.uid);
    await updateDoc(cartRef, { items: [], updatedAt: new Date() });
  };
  
  if (loading) {
    return <div className="bg-brand-dark text-brand-cream min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-brand-sage selection:text-white">
      <Navbar
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        user={user}
        isAdmin={isAdmin}
      />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <AnimatedRoutes 
        products={products}
        cartItems={cartItems}
        addToCart={addToCart}
        clearCart={clearCart}
      />
    </div>
  );
};

export default App;
