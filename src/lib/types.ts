// This file is kept for potential future use but is currently not central
// to data structures, which are now primarily defined by product-types.ts
// and inferred from Firestore.

import { type Product } from './product-types';

export type { Product };

export interface CartItem extends Product {
    quantity: number;
}
