import ProductGrid from '@/components/ProductGrid';
import { getProducts, getCategories } from '@/lib/data';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = getProducts();
  const categories = getCategories();

  const selectedCategory = typeof searchParams.category === 'string' ? searchParams.category : undefined;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl mb-8">
        {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : 'All Products'}
      </h1>
      <ProductGrid allProducts={products} allCategories={categories} />
    </div>
  );
}
