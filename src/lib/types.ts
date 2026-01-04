
export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: 'soaps' | 'perfumes' | 'serums' | 'gifting';
    description: string;
    image: string;
    thumbnails: string[];
    rating: number;
    reviews: number;
    isBestSeller?: boolean;
    isNew?: boolean;
    isSale?: boolean;
    ingredients?: string;
    scentNotes?: {
        top: string;
        middle: string;
        base: string;
    };
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    name: string;
    email: string;
    points: number;
    orderCount: number;
    memberStatus: string;
    avatar: string;
}

export interface Order {
    id: string;
    customer: string;
    customerAvatar: string;
    productName: string;
    productImage: string;
    date: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Processing';
    amount: number;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    avatar: string;
    totalOrders: number;
    totalSpent: number;
    lastActive: string;
}
