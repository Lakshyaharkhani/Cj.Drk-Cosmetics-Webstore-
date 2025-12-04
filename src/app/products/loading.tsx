import ProductGridSkeleton from '@/components/ProductGridSkeleton';

export default function ProductsLoadingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        {/* Filters Skeleton */}
        <aside className="lg:col-span-1">
          <div className="space-y-8 sticky top-24">
            <ProductGridSkeleton.Filters />
          </div>
        </aside>

        {/* Product Grid Skeleton */}
        <main className="lg:col-span-3">
          <ProductGridSkeleton.Grid />
        </main>
      </div>
    </div>
  );
}
