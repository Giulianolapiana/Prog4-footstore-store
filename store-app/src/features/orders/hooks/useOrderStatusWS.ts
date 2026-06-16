import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWsStore } from '../../../store/useWsStore';

export function useOrderStatusWS() {
  const queryClient = useQueryClient();
  const { isConnected, lastMessage } = useWsStore();

  useEffect(() => {
    if (isConnected && lastMessage) {
      if (lastMessage.event === 'estado_cambiado' || lastMessage.event === 'pedido_cancelado') {
        // Invalidar cache de pedidos para forzar re-fetch
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        
        if (lastMessage.pedido_id) {
           queryClient.invalidateQueries({ queryKey: ['order', lastMessage.pedido_id] });
        }
      }
    }
  }, [isConnected, lastMessage, queryClient]);
}
