
import { type Timestamp } from 'firebase/firestore';

export interface Product {
    id: string;
    active: boolean;
    name: string;
    slug: string;
    description: string;
    price: number;
    mrp: number;
    currency: string;
    sku: string;
    stock_quantity: number;
    weight_kg: number;
    dimensions: {
        length_cm: number;
        breadth_cm: number;
        height_cm: number;
    };
    category_id: string;
    tags: string[];
    images: string[];
    has_variants: boolean;
    created_at: Timestamp;
    updated_at: Timestamp;
    rating?: number;
    reviewCount?: number;
}
