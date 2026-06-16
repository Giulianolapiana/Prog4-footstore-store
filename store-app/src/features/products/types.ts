// Tipos propios de la feature de Productos y Categorías

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio_base: number;
  imagenes_url: string[];
  disponible: boolean;
  stock_cantidad: number;
  categorias: Category[];
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

export interface ProductFilters {
  categoria_id?: number;
  search?: string;
  disponible?: boolean;
  page?: number;
  size?: number;
}
