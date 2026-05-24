import api from './api';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../../types';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },
  me: async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return data;
  },
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};
