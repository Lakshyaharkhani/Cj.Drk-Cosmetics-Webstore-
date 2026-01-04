'use client';

import { useCollection, useFirestore, useMemoFirebase } from '../firebase';
import { collection, DocumentData } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

interface Product extends DocumentData {
  id: string;
}

const BestSellers = () => {
    const firestore = useFirestore();
    const productsRef = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
    const { data: products, isLoading } = useCollection<Product>(productsRef);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products && products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default BestSellers;
