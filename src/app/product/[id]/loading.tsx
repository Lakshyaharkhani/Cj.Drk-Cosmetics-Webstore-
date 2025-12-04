import { Skeleton } from '../../../components/ui/skeleton';

export default function ProductLoadingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery Skeleton */}
        <div>
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="mt-4 grid grid-cols-4 gap-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-12 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <Skeleton className="h-12 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
           <div className="flex items-center gap-4">
             <Skeleton className="h-10 w-24" />
             <Skeleton className="h-10 w-24" />
           </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>

      {/* Other sections skeleton */}
      <div className="mt-16 space-y-8">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
