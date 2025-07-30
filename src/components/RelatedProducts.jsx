
'use client';

import { useEffect, useState } from 'react';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { findProductsByNames } from '@/lib/data';
import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';

async function getRecommendationsAction(input) {
    try {
        const result = await getProductRecommendations(input);
        const productNames = result.recommendedProducts;
        // In a real app, you'd fetch these products from your DB
        const recommendedProducts = findProductsByNames(productNames);
        return recommendedProducts;
    } catch (error) {
        console.error("Failed to get recommendations:", error);
        return [];
    }
}

export default function RelatedProducts({ productDescription, productCategory, currentProductId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        setError(null);
        const result = await getRecommendationsAction({ productDescription, productCategory });
        // Filter out the current product from recommendations if it appears
        setRecommendations(result.filter(p => p.id !== currentProductId));
      } catch (e) {
        setError("Could not load recommendations.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [productDescription, productCategory, currentProductId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }

  if (recommendations.length === 0) {
    return <p className='text-muted-foreground'>No recommendations available right now.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {recommendations.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
