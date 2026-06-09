/**
 * ATENCIÓN: Este archivo existe solo por compatibilidad.
 * Los tipos ahora viven dentro de cada feature:
 *
 *   features/products/types.ts  → Product, Category, ProductFilters
 *   features/cart/types.ts      → CartItem
 *   features/orders/types.ts    → Order, OrderItem, OrderStatus, CreateOrderPayload
 *   features/checkout/types.ts  → PaymentMethod, FormaPago
 *   features/auth/types.ts      → User, UserRole, LoginPayload, RegisterPayload, AuthResponse
 *   shared/types/index.ts       → PaginatedResponse<T>, ApiError
 */

export type { Product, Category, ProductFilters } from './features/products/types';
export type { CartItem } from './features/cart/types';
export type { Order, OrderItem, OrderStatus, CreateOrderPayload } from './features/orders/types';
export type { PaymentMethod, FormaPago } from './features/checkout/types';
export type { User, UserRole, LoginPayload, RegisterPayload, AuthResponse } from './features/auth/types';
export type { PaginatedResponse, ApiError } from './shared/types';
