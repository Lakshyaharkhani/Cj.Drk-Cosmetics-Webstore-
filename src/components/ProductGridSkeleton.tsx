import ProductCardSkeleton from './ProductCardSkeleton';
import { Skeleton } from './ui/skeleton';

const Grid = () => (
  <>
    <div className="flex justify-between items-center mb-6">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-10 w-48" />
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {[...Array(9)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </>
);

const Filters = () => (
  <div className="space-y-8">
    <div>
      <Skeleton className="h-6 w-1/3 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
    <div>
      <Skeleton className="h-6 w-1/3 mb-4" />
      <Skeleton className="h-8 w-full" />
    </div>
     <div>
        <Skeleton className="h-8 w-2/3" />
     </div>
  </div>
);

const ProductGridSkeleton = {
    Grid,
    Filters
}

export default ProductGridSkeleton;
