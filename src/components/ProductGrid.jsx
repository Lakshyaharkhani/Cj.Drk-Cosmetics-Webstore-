
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';

export default function ProductGrid({ allProducts, allCategories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'popularity');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  const filteredAndSortedProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.categorySlug === selectedCategory);
    }
    
    // Filter by stock
    if (inStockOnly) {
        products = products.filter(p => p.stockStatus === 'In Stock' || p.stockStatus === 'Low Stock');
    }

    // Filter by price
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Sort
    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return products;
  }, [allProducts, selectedCategory, inStockOnly, priceRange, sortOption]);
  
  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
        params.delete('category');
    } else {
        params.set('category', slug);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const maxPrice = Math.max(...allProducts.map(p => p.price), 2000);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
      {/* Filters */}
      <aside className="lg:col-span-1">
        <div className="space-y-8 sticky top-24">
          <div>
            <h3 className="font-headline text-lg mb-4">Category</h3>
            <div className="space-y-2">
                <Button variant={selectedCategory === 'all' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => handleCategoryChange('all')}>All Products</Button>
                {allCategories.map(cat => (
                    <Button variant={selectedCategory === cat.slug ? 'secondary' : 'ghost'} className="w-full justify-start" key={cat.id} onClick={() => handleCategoryChange(cat.slug)}>{cat.name}</Button>
                ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-lg mb-4">Price Range</h3>
            <Slider
              min={0}
              max={maxPrice}
              step={100}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Rs {priceRange[0]}</span>
              <span>Rs {priceRange[1]}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(!!checked)} />
                <Label htmlFor="in-stock" className="font-headline text-lg">In Stock Only</Label>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid & Sort */}
      <main className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">{filteredAndSortedProducts.length} products</p>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAndSortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <h2 className="font-headline text-2xl">No Products Found</h2>
                <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
        )}
      </main>
    </div>
  );
}
