import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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

const AnimatedRoutes = () => {
  const location = useLocation();
  const { firestore, user } = useFirebase();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);

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
      setCartId(null);
      return;
    }

    const cartRef = doc(firestore, 'carts', user.uid);
    const unsub = onSnapshot(cartRef, async (cartDoc) => {
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        const productIds = cartData.items.map((item: { productId: string }) => item.productId);
        
        if (productIds.length > 0) {
          const productsPromises = productIds.map((id: string) => getDoc(doc(firestore, 'products', id)));
          const productSnapshots = await Promise.all(productsPromises);
          
          const productsData = productSnapshots.reduce((acc, doc) => {
            if (doc.exists()) {
              acc[doc.id] = { ...doc.data(), id: doc.id } as Product;
            }
            return acc;
          }, {} as { [key: string]: Product });

          const populatedItems = cartData.items.map((item: { productId: string; quantity: number }) => {
            const product = productsData[item.productId];
            if (product) {
              const imageUrl = (Array.isArray(product.images) && product.images.length > 0 && isValidHttpUrl(product.images[0])) ? product.images[0] : 'https://placehold.co/400x400';
              return {
                id: product.id,
                name: product.name,
                price: product.price,
                image: imageUrl,
                quantity: item.quantity,
              };
            }
            return null;
          }).filter(Boolean) as CartItem[];
          
          setCartItems(populatedItems);
        } else {
          setCartItems([]);
        }
        setCartId(cartDoc.id);
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
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    const cartRef = doc(firestore, 'carts', user.uid);
    const cartDoc = await getDoc(cartRef);
    if (cartDoc.exists()) {
      const items = cartDoc.data().items || [];
      const itemIndex = items.findIndex((item: { productId: string }) => item.productId === productId);
      if (itemIndex > -1) {
        const newItems = [...items];
        newItems[itemIndex].quantity = newQuantity;
        await updateDoc(cartRef, { items: newItems, updatedAt: new Date() });
      }
    }
  };
  
  const clearCart = async () => {
    if (!firestore || !user) return;
    const cartRef = doc(firestore, 'carts', user.uid);
    await updateDoc(cartRef, { items: [], updatedAt: new Date() });
  };


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
  const { user, loading, isAdmin } = useFirebase();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  if (loading) {
    return <div>Loading...</div>; // Or a proper splash screen
  }

  return (
    <div className="min-h-screen font-sans selection:bg-brand-sage selection:text-white">
      <Navbar
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        cartCount={0} // This will be dynamic later
        user={user}
        isAdmin={isAdmin}
      />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      <AnimatedRoutes />
    </div>
  );
};

export default App;
