// Tipos propios de la feature del Carrito
import type { Product } from '../products/types';

export interface CartItem {
  product: Product;
  quantity: number;
}
