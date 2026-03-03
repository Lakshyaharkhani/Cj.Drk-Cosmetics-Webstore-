import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { ShoppingBag, Search, Menu, Home, Compass, ShoppingCart, Mail, X, ArrowRight, User as UserIcon, LogOut } from 'lucide-react';
import { useFirebase } from '../firebase/FirebaseProvider';
import { Product } from '../types';
import { isValidHttpUrl } from '../lib/utils';

interface NavbarProps {
  toggleCart: () => void;
  cartCount: number;
  user: User | null;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleCart, cartCount, user, isAdmin }) => {
  const { auth, firestore } = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
      setProducts(productsData);
    });
    return () => unsub();
  }, [firestore]);

  // Close search and clear query on route change
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shop', label: 'Shop', icon: ShoppingCart },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];
  
  if (isAdmin) {
    navLinks.push({ path: '/admin', label: 'Admin', icon: UserIcon });
  }

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
      navigate('/');
    }
  };

  return (
    <>
      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 bg-[#1A1A1A]/95 backdrop-blur-xl z-[60] transition-all duration-300 flex flex-col ${
          isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 pt-24 max-w-4xl h-full flex flex-col">
          <div className="flex items-center gap-4 border-b border-brand-cream/20 pb-6 mb-8 relative">
            <Search className="text-brand-cream/50" size={28} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search products, categories..." 
              className="w-full bg-transparent text-2xl md:text-4xl text-brand-cream placeholder:text-brand-cream/20 focus:outline-none font-serif"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full text-brand-cream transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
            {searchQuery && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-brand-cream/40 uppercase tracking-widest mb-4">
                  {filteredProducts.length} Results Found
                </p>
                {filteredProducts.map(product => {
                  const imageUrl = (Array.isArray(product.images) && product.images.length > 0 && isValidHttpUrl(product.images[0])) ? product.images[0] : 'https://placehold.co/400x400';
                  return(
                  <div 
                    key={product.id} 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/5"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white shrink-0">
                      <img src={imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-serif text-brand-cream group-hover:text-brand-sage transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-brand-cream/50">{product.category_id}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-brand-cream/10 flex items-center justify-center text-brand-cream/40 group-hover:bg-brand-sage group-hover:text-brand-dark group-hover:border-brand-sage transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                )})}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-brand-cream/30 text-xl font-serif">Nothing matches your search.</p>
                  </div>
                )}
              </div>
            )}
            {!searchQuery && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <p className="col-span-full text-sm font-medium text-brand-cream/40 uppercase tracking-widest mb-2">Suggested</p>
                {['soaps', 'perfumes', 'serums'].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-brand-cream text-left transition-colors"
                  >
                    {term.charAt(0).toUpperCase() + term.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Brand Bar */}
      <header className={`fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center transition-colors duration-300 border-b ${isHome ? 'bg-brand-dark/90 border-white/10 text-brand-cream' : 'bg-brand-cream/90 border-brand-dark/10 text-brand-dark'} backdrop-blur-sm`}>
        <Link to="/">
          <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight">
            CJ DRK Cosmetic ™
          </h1>
        </Link>
        <div className="flex gap-4 items-center">
           <button 
             onClick={() => setIsSearchOpen(true)} 
             className="relative group p-1"
             aria-label="Search"
           >
            <Search className={`w-5 h-5 transition-colors ${isHome ? 'hover:text-white' : 'hover:text-brand-sage'}`} />
           </button>

           <button 
             onClick={toggleCart} 
             className="relative group p-1"
             aria-label="Cart"
           >
            <ShoppingBag className={`w-5 h-5 transition-colors ${isHome ? 'hover:text-white' : 'hover:text-brand-sage'}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
           {user ? (
              <button 
                onClick={handleLogout} 
                className="relative group p-1"
                aria-label="Logout"
              >
                <LogOut className={`w-5 h-5 transition-colors ${isHome ? 'hover:text-white' : 'hover:text-brand-sage'}`} />
              </button>
           ) : (
             <Link 
               to="/auth" 
               className="relative group p-1"
               aria-label="Login"
             >
              <UserIcon className={`w-5 h-5 transition-colors ${isHome ? 'hover:text-white' : 'hover:text-brand-sage'}`} />
             </Link>
           )}
        </div>
      </header>

      {/* Floating Bottom Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 bg-[#2A2A2A] border border-white/10 rounded-full p-2 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-3 rounded-full transition-all duration-300 group flex flex-col items-center justify-center gap-1 ${
                  isActive ? 'bg-brand-cream text-brand-dark' : 'text-brand-cream/60 hover:text-brand-cream hover:bg-white/10'
                }`}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className={`text-[10px] font-medium absolute -top-8 bg-brand-dark text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
