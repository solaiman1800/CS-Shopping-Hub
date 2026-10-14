export interface Product {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  category: string;
  inStock: boolean;
  stockStatusText: string;
  stockTextEn: string;
  soldPercent?: number;
  isFlashDeal?: boolean;
  description: string;
  specs: string[];
  colors?: string[];
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  count: string;
  image?: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  initials: string;
  location: string;
  rating: number;
  verified: boolean;
}

export interface OrderInfo {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: 'dhaka' | 'outside';
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'confirmed' | 'packaging' | 'shipped' | 'delivered';
  createdAt: string;
}
