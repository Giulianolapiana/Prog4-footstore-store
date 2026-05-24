// Product types
export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  disponible: boolean;
  stock: number;
  categoria: Category;
  ingredientes?: string[];
  alergenos?: string[];
  es_destacado?: boolean;
  mas_vendido?: boolean;
}

export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
  imagen_url?: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Order types
export type OrderStatus =
  | 'PENDIENTE'
  | 'CONFIRMADO'
  | 'EN_PREP'
  | 'EN_CAMINO'
  | 'ENTREGADO'
  | 'CANCELADO';

export interface Order {
  id: number;
  usuario_id: number;
  items: OrderItem[];
  total: number;
  estado: OrderStatus;
  direccion_entrega: string;
  forma_pago: PaymentMethod;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  producto: Product;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface CreateOrderPayload {
  items: { producto_id: number; cantidad: number }[];
  direccion_entrega: string;
  forma_pago: PaymentMethod;
}

export type PaymentMethod = 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';

// Auth types
export interface User {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  rol: 'cliente' | 'admin';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

// API response wrappers
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ApiError {
  detail: string;
  status_code?: number;
}

// Filter types
export interface ProductFilters {
  categoria_id?: number;
  search?: string;
  disponible?: boolean;
  page?: number;
  size?: number;
}
