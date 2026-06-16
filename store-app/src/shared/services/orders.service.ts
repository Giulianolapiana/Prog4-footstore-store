import api from './api';
import type { CreateOrderPayload, Order } from '../../features/orders/types';

export const ordersService = {
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await api.get('/pedidos/');
    return data;
  },
  getById: async (id: number): Promise<Order> => {
    const { data } = await api.get(`/pedidos/${id}`);
    return data;
  },
  create: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await api.post('/pedidos/', payload);
    return data;
  },
  cancel: async (id: number): Promise<Order> => {
    const { data } = await api.patch(`/pedidos/${id}/cancelar`);
    return data;
  },
};
