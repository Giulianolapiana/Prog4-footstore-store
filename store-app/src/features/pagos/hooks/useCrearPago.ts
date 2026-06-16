import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pagosService } from '../api';
import type { PagoRequest, PreferenciaResponse } from '../types';

export const useCrearPago = () => {
  const queryClient = useQueryClient();

  return useMutation<PreferenciaResponse, Error, PagoRequest>({
    mutationFn: (data: PagoRequest) => pagosService.crearPago(data),
    onSuccess: () => {
      // Opcional: Invalidar o refetch de queries si fuera necesario.
      // queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Error al crear el pago:', error);
      // Aquí se puede integrar con un sistema de Toasts (ej. react-hot-toast)
    },
  });
};
