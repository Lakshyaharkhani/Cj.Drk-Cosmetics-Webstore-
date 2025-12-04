
'use client';
import ProductGrid from '../../components/ProductGrid';
import { getCategories } from '../../lib/data';
import { useCollection } from '../../firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '../../firebase/provider';


export default function ProductsPage({
  searchParams,
}) {
  const firestore = useFirestore();
  const { data: products, isLoading } = useCollection(collection(firestore, 'products'));
  const categories = getCategories();

  const selectedCategory = searchParams.category || 'all';

  const categoryName = selectedCategory === 'all'
    ? 'All Products'
    : categories.find(c => c.slug === selectedCategory)?.name || 'Products';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl mb-8">
        {categoryName}
      </h1>
      <ProductGrid allProducts={products || []} allCategories={categories} isLoading={isLoading}/>
    </div>
  );
}
