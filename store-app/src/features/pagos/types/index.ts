// Tipos relacionados con Mercado Pago y Pagos

export type EstadoPago = 'pendiente' | 'aprobado' | 'rechazado' | 'cancelado' | 'en_proceso' | 'reembolsado';

export interface PagoRequest {
  pedido_id: number;
}

export interface PreferenciaResponse {
  preference_id: string;
  init_point: string;
}

export interface PagoResponse {
  id: number;
  pedido_id: number;
  estado: EstadoPago;
  metodo_pago?: string;
  monto: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface WebhookStatus {
  action: string;
  data: { id: string };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: number;
}
