import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useWsStore } from '../../../store/useWsStore';
import { useAuthStore } from '../../../store/auth.store';

export function useOrderStatusWS() {
  const queryClient = useQueryClient();
  const { isConnected, lastMessage, connect, disconnect } = useWsStore();
  const { user } = useAuthStore();

  // Conectar cuando se monta el componente y hay usuario
  useEffect(() => {
    if (user?.id) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [user?.id, connect, disconnect]);

  useEffect(() => {
    if (isConnected && lastMessage) {
      if (lastMessage.event === 'estado_cambiado' || lastMessage.event === 'pedido_cancelado') {
        // Invalidar cache de pedidos para forzar re-fetch
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        
        if (lastMessage.pedido_id) {
           queryClient.invalidateQueries({ queryKey: ['order', lastMessage.pedido_id] });
        }

        // Mostrar Toast si cambia de estado
        if (lastMessage.event === 'estado_cambiado') {
          toast(`Tu pedido #${lastMessage.pedido_id} ahora está: ${lastMessage.estado_nuevo}`, {
            icon: '📦',
            id: `toast-estado-${lastMessage.pedido_id}-${lastMessage.estado_nuevo}`,
          });
        }
      }

      if (lastMessage.event === 'pago_confirmado') {
        toast.success(`¡El pago de tu pedido #${lastMessage.pedido_id} fue confirmado!`, {
          duration: 5000,
          position: 'top-right',
          icon: '🎉',
          id: `toast-pago-${lastMessage.pedido_id}`,
        });
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        if (lastMessage.pedido_id) {
          queryClient.invalidateQueries({ queryKey: ['order', lastMessage.pedido_id] });
        }
      }
    }
  }, [isConnected, lastMessage, queryClient]);
}
