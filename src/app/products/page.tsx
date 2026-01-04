
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import ProductGridSkeleton from '../../components/ProductGridSkeleton';
import { useCollection, useFirestore, useMemoFirebase } from '../../firebase';
import { collection, DocumentData } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface Product extends DocumentData {
  id: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  price: number;
}

interface Category extends DocumentData {
  id: string;
  slug: string;
  name: string;
}

const FiltersContent = ({
  allCategories,
  selectedCategories,
  toggleCategory,
  maxPrice,
  setMaxPrice,
  absoluteMaxPrice,
}: {
  allCategories: Category[];
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  absoluteMaxPrice: number;
}) => (
  <div className="space-y-10">
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          Category
        </h3>
        {selectedCategories.length > 0 && (
          <Button
            variant="link"
            onClick={() => toggleCategory('__RESET__')}
            className="text-[10px] font-bold uppercase p-0 h-auto"
          >
            Reset
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {allCategories.map((cat) => (
          <div key={cat.id} className="flex items-center">
            <Checkbox
              id={`cat-${cat.slug}`}
              checked={selectedCategories.includes(cat.slug)}
              onCheckedChange={() => toggleCategory(cat.slug)}
            />
            <Label htmlFor={`cat-${cat.slug}`} className="ml-3 text-sm font-semibold text-gray-600 dark:text-gray-300 capitalize cursor-pointer">
              {cat.name}
            </Label>
          </div>
        ))}
      </div>
    </section>

    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
          Price Range
        </h3>
        <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">
          Up to Rs {maxPrice}
        </span>
      </div>
      <div className="relative pt-2">
        <Slider
          min={0}
          max={absoluteMaxPrice}
          step={10}
          value={[maxPrice]}
          onValueChange={(value) => setMaxPrice(value[0])}
        />
        <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-tighter text-gray-400">
          <span>Rs 0</span>
          <span>Rs {absoluteMaxPrice}</span>
        </div>
      </div>
    </section>
  </div>
);

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const firestore = useFirestore();
  const productsRef = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: allProducts, isLoading: isLoadingProducts } = useCollection<Product>(productsRef);

  const categoriesRef = useMemoFirebase(() => collection(firestore, 'categories'), [firestore]);
  const { data: allCategories, isLoading: isLoadingCategories } = useCollection<Category>(categoriesRef);

  const query = searchParams.get('q')?.toLowerCase() || '';
  const initialCategory = searchParams.get('category');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [isClient, setIsClient] = useState(false);

  const absoluteMaxPrice = useMemo(() => allProducts ? Math.max(...allProducts.map(p => p.price), 50) : 2000, [allProducts]);
  const [maxPrice, setMaxPrice] = useState<number>(absoluteMaxPrice);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
      if (initialCategory) {
          setSelectedCategories([initialCategory]);
      }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter(p => {
        const matchesQuery = query ? p.name.toLowerCase().includes(query) || 
                           p.description.toLowerCase().includes(query) ||
                           p.category.toLowerCase().includes(query) : true;
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.categorySlug);
        const matchesPrice = p.price <= maxPrice;
        return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, selectedCategories, maxPrice, allProducts]);

  const toggleCategory = (catSlug: string) => {
    if (catSlug === '__RESET__') {
      setSelectedCategories([]);
      return;
    }
    const newSelected = selectedCategories.includes(catSlug)
        ? selectedCategories.filter(c => c !== catSlug)
        : [...selectedCategories, catSlug];
    setSelectedCategories(newSelected);
  };
  
  const clearSearch = () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      router.push(`${pathname}?${params.toString()}`);
  };

  const isLoading = isLoadingProducts || isLoadingCategories;

  const currentCategoryName = useMemo(() => {
      if(query) return `Results for "${query}"`;
      if (selectedCategories.length === 1) {
          return allCategories?.find(c => c.slug === selectedCategories[0])?.name || 'All Essentials';
      }
      if (selectedCategories.length > 1) return 'Multiple Categories';
      return 'All Essentials';
  }, [query, selectedCategories, allCategories]);

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <ProductGridSkeleton.Filters />
          </aside>
          <main className="lg:col-span-3">
            <ProductGridSkeleton.Grid />
          </main>
        </div>
      </div>
    );
  }

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-100 dark:border-gray-800 pb-8">
              <div className="space-y-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Natural Collection</span>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#181311] dark:text-white">
                      {currentCategoryName}
                  </h1>
                  {query && (
                      <button
                          onClick={clearSearch}
                          className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-primary transition-colors"
                      >
                          <span className="material-symbols-outlined text-[14px]">close</span> Clear Search
                      </button>
                  )}
              </div>
              
              <div className="flex items-center gap-4">
                  <p className="text-sm font-bold text-gray-400 hidden sm:block">
                      {filteredProducts.length} Products Found
                  </p>
                  <Button
                      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                      className="lg:hidden"
                  >
                      <span className="material-symbols-outlined text-[18px]">{isFiltersOpen ? 'close' : 'tune'}</span>
                      {isFiltersOpen ? 'Close' : 'Filter'}
                  </Button>
              </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
              <aside className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
                  <div className="sticky top-28 p-8 bg-white dark:bg-card rounded-3xl border border-gray-100 dark:border-border shadow-sm lg:shadow-none lg:bg-transparent lg:p-0">
                      <FiltersContent 
                          allCategories={allCategories || []}
                          selectedCategories={selectedCategories}
                          toggleCategory={toggleCategory}
                          maxPrice={maxPrice}
                          setMaxPrice={setMaxPrice}
                          absoluteMaxPrice={absoluteMaxPrice}
                      />
                  </div>
              </aside>

              <section className="flex-1">
                  {isLoading ? (
                    <ProductGridSkeleton.Grid />
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                          {filteredProducts.map((p, idx) => (
                              <div
                                  key={p.id}
                                  className="animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
                                  style={{ animationDelay: `${idx * 50}ms` }}
                              >
                                  <ProductCard product={p} />
                              </div>
                          ))}
                      </div>

                      {!isLoading && filteredProducts.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-gray-50 dark:bg-gray-900/30 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                              <div className="size-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-6">
                                  <span className="material-symbols-outlined text-4xl text-gray-300">search_off</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">No items match your criteria</h3>
                              <p className="text-gray-500 max-w-xs mb-8">Try adjusting the filters or clearing your search.</p>
                              <div className="flex gap-4">
                                  <Button
                                      variant="outline"
                                      onClick={() => { setMaxPrice(absoluteMaxPrice); setSelectedCategories([]); }}
                                  >
                                      Clear Filters
                                  </Button>
                                  {query && <Button onClick={clearSearch}>Clear Search</Button>}
                              </div>
                          </div>
                      )}
                    </>
                  )}
              </section>
          </div>
      </main>
  );
};

    