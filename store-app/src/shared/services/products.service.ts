import api from './api';
import type { PaginatedResponse, Product, ProductFilters } from '../../types';

export const productsService = {
  getAll: async (filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get('/productos', { params: filters });
    return data;
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
