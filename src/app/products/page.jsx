
import ProductGrid from '@/components/ProductGrid';
import { getProducts, getCategories } from '@/lib/data';

export default function ProductsPage({
  searchParams,
}) {
  const products = getProducts();
  const categories = getCategories();

  const selectedCategory = searchParams.category || 'all';
  const page = searchParams.page || '1';

  const categoryName = selectedCategory === 'all'
    ? 'All Products'
    : categories.find(c => c.slug === selectedCategory)?.name || 'Products';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl mb-8">
        {categoryName}
      </h1>
      <ProductGrid allProducts={products} allCategories={categories} />
    </div>
  );
}
