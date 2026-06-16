// Tipos propios de la feature de Checkout

// Los códigos coinciden con los que devuelve el backend (seed.py)
export type PaymentMethod = 'CASH' | 'DEBIT' | 'CREDIT' | 'MP';

export interface FormaPago {
  id: number;
  codigo: PaymentMethod;
  nombre: string;
}
