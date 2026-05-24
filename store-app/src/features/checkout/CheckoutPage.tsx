import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MapPin, CreditCard, Banknote, Building2, CheckCircle, ArrowLeft } from 'lucide-react';
import { ordersService } from '../../shared/services/orders.service';
import { useCartStore } from '../../store/cart.store';
import { useAuthStore } from '../../store/auth.store';
import { Button } from '../../shared/ui/Button';
import { Input } from '../../shared/ui/Input';
import { formatPrice } from '../../shared/lib/utils';
import type { PaymentMethod } from '../../types';

const paymentOptions: { value: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { value: 'EFECTIVO', label: 'Efectivo', icon: <Banknote className="w-5 h-5" /> },
  { value: 'TARJETA', label: 'Tarjeta', icon: <CreditCard className="w-5 h-5" /> },
  { value: 'TRANSFERENCIA', label: 'Transferencia', icon: <Building2 className="w-5 h-5" /> },
];

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [address, setAddress] = useState(user?.direccion || '');
  const [payment, setPayment] = useState<PaymentMethod>('EFECTIVO');
  const [success, setSuccess] = useState(false);

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: ordersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      clearCart();
      setSuccess(true);
      setTimeout(() => navigate('/orders'), 2500);
    },
  });

  const handleSubmit = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!address.trim()) return;
    createOrder({
      items: items.map((i) => ({ producto_id: i.product.id, cantidad: i.quantity })),
      direccion_entrega: address,
      forma_pago: payment,
    });
  };

  const total = getTotal();

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold text-[#151c27] mb-2">¡Pedido confirmado!</h2>
        <p className="text-[#5b4038]">Redirigiendo a tus pedidos...</p>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[#5b4038] hover:text-[#ae3200] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al carrito
      </button>

      <h1 className="text-3xl font-bold text-[#151c27] mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#e4beb3]/30 p-6"
          >
            <h2 className="text-lg font-semibold text-[#151c27] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#ae3200]" /> Dirección de entrega
            </h2>
            <Input
              label="Dirección completa"
              placeholder="Ej: Av. San Martín 1234, Mendoza"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!address.trim() ? undefined : undefined}
            />
          </motion.div>

          {/* Payment */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-[#e4beb3]/30 p-6"
          >
            <h2 className="text-lg font-semibold text-[#151c27] mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#ae3200]" /> Forma de pago
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPayment(opt.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    payment === opt.value
                      ? 'border-[#ae3200] bg-[#ffdbd0]/40 text-[#ae3200]'
                      : 'border-[#e4beb3]/40 text-[#5b4038] hover:border-[#ae3200]/30'
                  }`}
                >
                  {opt.icon}
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-[#e4beb3]/30 p-6 sticky top-24"
          >
            <h2 className="text-lg font-bold text-[#151c27] mb-4">Tu pedido</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm text-[#5b4038]">
                  <span className="truncate mr-2">{item.product.nombre} x{item.quantity}</span>
                  <span className="shrink-0 font-medium">{formatPrice(item.product.precio * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e4beb3]/40 pt-3 mb-5">
              <div className="flex justify-between font-bold text-[#151c27]">
                <span>Total</span>
                <span className="text-[#ae3200] text-xl">{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              fullWidth
              size="lg"
              loading={isPending}
              disabled={!address.trim()}
              onClick={handleSubmit}
            >
              Confirmar pedido
            </Button>
            {!isAuthenticated && (
              <p className="text-xs text-[#5b4038] text-center mt-3">
                Necesitás <button onClick={() => navigate('/login')} className="text-[#ae3200] font-semibold">iniciar sesión</button> para continuar
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
