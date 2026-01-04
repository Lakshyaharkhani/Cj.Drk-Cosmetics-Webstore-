
'use client';
import ProductGrid from '../../components/ProductGrid';
import { useCollection, useFirestore, useMemoFirebase } from '../../firebase';
import { collection, DocumentData } from 'firebase/firestore';
import React from 'react';

interface ProductsPageProps {
  searchParams: {
    category?: string;
  };
}

interface Product extends DocumentData {
  id: string;
}

interface Category extends DocumentData {
  id: string;
  slug: string;
  name: string;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const firestore = useFirestore();
  const productsRef = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: products, isLoading } = useCollection<Product>(productsRef);
  
  const categoriesRef = useMemoFirebase(() => collection(firestore, 'categories'), [firestore]);
  const { data: categories } = useCollection<Category>(categoriesRef);

  const selectedCategory = searchParams.category || 'all';

  const categoryName = selectedCategory === 'all'
    ? 'All Products'
    : categories?.find(c => c.slug === selectedCategory)?.name || 'Products';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl mb-8">
        {categoryName}
      </h1>
      <ProductGrid allProducts={products || []} allCategories={categories || []} isLoading={isLoading}/>
    </div>
  );
}
