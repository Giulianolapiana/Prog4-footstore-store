import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, CheckCircle2, ChefHat, Truck, Package, XCircle, CreditCard } from 'lucide-react';
import { ordersService } from '../../shared/services/orders.service';
import { useCrearPago } from '../pagos/hooks';
import { Badge } from '../../shared/ui/Badge';
import { Button } from '../../shared/ui/Button';
import { EmptyState } from '../../shared/ui/EmptyState';
import { Skeleton } from '../../shared/ui/Skeleton';
import type { OrderStatus } from './types';
import { formatDate, formatPrice } from '../../shared/lib/utils';

const statusConfig: Record<OrderStatus, { label: string; variant: 'neutral' | 'warning' | 'info' | 'success' | 'error' | 'primary'; icon: React.ReactNode }> = {
  PENDIENTE: { label: 'Pendiente', variant: 'warning', icon: <Clock className="w-3.5 h-3.5" /> },
  CONFIRMADO: { label: 'Confirmado', variant: 'info', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  EN_PREP: { label: 'En preparación', variant: 'primary', icon: <ChefHat className="w-3.5 h-3.5" /> },
  EN_CAMINO: { label: 'En camino', variant: 'info', icon: <Truck className="w-3.5 h-3.5" /> },
  ENTREGADO: { label: 'Entregado', variant: 'success', icon: <Package className="w-3.5 h-3.5" /> },
  CANCELADO: { label: 'Cancelado', variant: 'error', icon: <XCircle className="w-3.5 h-3.5" /> },
};

const cancellable: OrderStatus[] = ['PENDIENTE', 'CONFIRMADO'];

const RetryPaymentButton = ({ order }: { order: import('./types').Order }) => {
  const { mutate, data: preferencia, isPending } = useCrearPago();

  React.useEffect(() => {
    if (preferencia?.init_point) {
      window.location.href = preferencia.init_point;
    }
  }, [preferencia]);

  const handleRetry = () => {
    mutate({ pedido_id: order.id });
  };

  return (
    <Button
      variant="primary"
      size="sm"
      loading={isPending}
      onClick={handleRetry}
      className="ml-2 bg-blue-500 hover:bg-blue-600 border-none text-white font-medium shadow-sm transition-all flex items-center gap-1.5"
    >
      <CreditCard className="w-3.5 h-3.5" />
      Reintentar Pago
    </Button>
  );
};

export const OrdersPage = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: ordersService.getMyOrders,
  });

  const { mutate: cancelOrder, isPending: cancelling } = useMutation({
    mutationFn: ordersService.cancel,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  if (isLoading) return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-10 w-48 mb-8" />
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)}
    </div>
  );

  if (isError) return (
    <div className="text-center py-16 text-[#ba1a1a]">
      Error al cargar pedidos. Intentá de nuevo.
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-10 py-8">
      <h1 className="text-3xl font-bold text-[#151c27] mb-8">Mis Pedidos</h1>

      {!orders || orders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No tenés pedidos aún"
          description="Hacé tu primer pedido y aparecerá aquí"
          action={{ label: 'Ver menú', onClick: () => window.location.href = '/products' }}
        />
      ) : (
        <motion.div className="space-y-5">
          {orders.map((order, i) => {
            const estadoCodigo = order.estado_actual?.codigo || 'PENDIENTE';
            const status = statusConfig[estadoCodigo];
            const canCancel = cancellable.includes(estadoCodigo);

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-[#e4beb3]/30 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <span className="font-mono-label text-xs text-[#8f7067]">Pedido #</span>
                    <span className="font-mono text-sm font-bold text-[#151c27]">{order.id}</span>
                    <p className="text-xs text-[#8f7067] mt-0.5">{formatDate(order.created_at)}</p>
                  </div>
                  <Badge variant={status.variant}>
                    <span className="flex items-center gap-1">
                      {status.icon}
                      {status.label}
                    </span>
                  </Badge>
                </div>

                {/* Items */}
                <div className="space-y-1.5 mb-4">
                  {order.detalles?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-[#5b4038]">
                      <span>{item.producto_nombre} <span className="text-[#8f7067]">x{item.cantidad}</span></span>
                      <span>{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[#e4beb3]/30 pt-3">
                  <div className="text-sm text-[#5b4038]">
                    <span className="font-medium">Total: </span>
                    <span className="text-[#ae3200] font-bold text-base">{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex gap-2">
                    {canCancel && (
                      <Button
                        variant="danger"
                        size="sm"
                        loading={cancelling}
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancelar
                      </Button>
                    )}
                    {order.estado_actual?.codigo === 'PENDIENTE' && 
                     order.forma_pago?.codigo === 'MP' && (
                      <RetryPaymentButton order={order} />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
