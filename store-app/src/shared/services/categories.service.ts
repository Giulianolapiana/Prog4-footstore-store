import api from './api';
import type { Category } from '../../features/products/types';

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get('/categorias');
    return data;
  },
};
