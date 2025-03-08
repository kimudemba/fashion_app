export interface User {
  id: string;
  email: string;
  name: string | null;
  profileImage: string | null;
  preferences?: Record<string, any>;
  sizingData?: Record<string, any>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  retailerId: string;
  imageUrl: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
}

export interface Outfit {
  id: string;
  name: string;
  description: string;
  style: string;
  occasion: string;
  season: string;
  imageUrl: string;
  products: Product[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  style?: string;
  occasion?: string;
  season?: string;
  priceRange?: {
    min: number;
    max: number;
  };
} 