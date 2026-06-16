// Tipos propios de la feature de Pedidos (Orders)

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
  total: number;
  estado_actual: { codigo: OrderStatus; nombre: string };
  direccion_entrega: { calle: string; numero: string; ciudad: string };
  forma_pago: { codigo: string; nombre: string };
  detalles?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  producto_id: number;
  producto_nombre: string;
  producto_precio: number;
  cantidad: number;
  subtotal: number;
}

export interface CreateOrderPayload {
  detalles: { producto_id: number; cantidad: number }[];
  direccion_entrega_id: number;
  forma_pago_id: number;
}
