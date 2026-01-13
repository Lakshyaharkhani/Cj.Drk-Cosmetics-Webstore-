export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category_id: string;
  tags: string[];
  stock_quantity: number;
  accentColor?: string;
}
