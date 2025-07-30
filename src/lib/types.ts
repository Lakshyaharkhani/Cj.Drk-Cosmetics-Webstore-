export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  reviewCount: number;
  features: string[];
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Policy {
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}
