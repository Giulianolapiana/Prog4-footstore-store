// Tipos COMPARTIDOS entre múltiples features
// Solo van acá los tipos que necesitan 2 o más features simultáneamente

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
