import api from './api';
import type { Product, ProductFilters } from '../../types';

export const productsService = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    const { data } = await api.get('/productos', { params: { nombre: filters?.search } });
    let items = Array.isArray(data) ? data : (data.items || []);
    if (filters?.categoria_id) {
      items = items.filter(p => p.categorias?.some(c => c.id === filters.categoria_id));
    }
    return items;
  },
  getById: async (id: number): Promise<Product> => {
    const { data } = await api.get(`/productos/${id}`);
    return data;
  },
  getDestacados: async (): Promise<Product[]> => {
    const { data } = await api.get('/productos', { params: { es_destacado: true, size: 6 } });
    return data.items ?? data;
  },
  getMasVendidos: async (): Promise<Product[]> => {
    const { data } = await api.get('/productos', { params: { mas_vendido: true, size: 8 } });
    return data.items ?? data;
  },
};
