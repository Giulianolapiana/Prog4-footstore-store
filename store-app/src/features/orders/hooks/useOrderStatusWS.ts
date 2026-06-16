import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../../store/auth.store';

interface WSEvent {
  event: string;
  pedido_id: number;
  status?: string;
}

export const useOrderStatusWS = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id;
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Convertimos la URL de la API a ws:// o wss://
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    const wsUrl = apiUrl.replace(/^http/, 'ws') + `/ws/pedidos/${userId}`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('🔌 Conectado al WebSocket de Pedidos');
    };

    ws.current.onmessage = (event) => {
      try {
        const data: WSEvent = JSON.parse(event.data);
        
        if (data.event === 'pago_confirmado') {
          // 1. Mostrar Toast amigable
          toast.success(`¡El pago de tu pedido #${data.pedido_id} fue confirmado!`, {
            duration: 5000,
            position: 'top-right',
            icon: '🎉',
          });

          // 2. Invalidar queries para que la UI se actualice sola
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          queryClient.invalidateQueries({ queryKey: ['order', data.pedido_id] });
        }
        
        if (data.event === 'estado_actualizado') {
          toast(`Tu pedido #${data.pedido_id} ahora está: ${data.status}`, {
            icon: '📦',
          });
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        }

      } catch (error) {
        console.error('Error parseando mensaje WS:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.current.onclose = () => {
      console.log('🔌 Desconectado del WebSocket de Pedidos');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userId, queryClient]);

  return ws.current;
};
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
