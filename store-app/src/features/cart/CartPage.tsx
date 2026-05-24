import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cart.store';
import { QuantitySelector } from '../../shared/ui/QuantitySelector';
import { Button } from '../../shared/ui/Button';
import { EmptyState } from '../../shared/ui/EmptyState';
import { formatPrice } from '../../shared/lib/utils';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getSubtotal, getTotal, clearCart } =
    useCartStore();

  const subtotal = getSubtotal();
  const delivery = subtotal > 0 ? 2.5 : 0;
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto py-16">
        <EmptyState
          icon={ShoppingCart}
          title="Tu carrito está vacío"
          description="Explorá el menú y agregá tus platos favoritos"
          action={{ label: 'Ir al menú', onClick: () => navigate('/products') }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#151c27]">Tu Carrito</h1>
        <button
          onClick={clearCart}
          className="text-sm text-[#5b4038] hover:text-[#ba1a1a] flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Vaciar carrito
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                className="flex gap-5 bg-white rounded-2xl p-4 border border-[#e4beb3]/30 shadow-sm"
              >
                <img
                  src={item.product.imagen_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&q=70'}
                  alt={item.product.nombre}
                  className="w-24 h-24 object-cover rounded-xl shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&q=70';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#151c27] text-base">{item.product.nombre}</h3>
                  <p className="text-xs text-[#8f7067] mt-0.5">{item.product.categoria?.nombre}</p>
                  <p className="text-[#ae3200] font-bold mt-1">{formatPrice(item.product.precio)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                      size="sm"
                    />
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#151c27]">
                        {formatPrice(item.product.precio * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#8f7067] hover:text-[#ba1a1a] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#e4beb3]/30 shadow-sm p-6 sticky top-24"
          >
            <h2 className="text-lg font-bold text-[#151c27] mb-5">Resumen</h2>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-[#5b4038]">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#5b4038]">
                <span>Costo de envío</span>
                <span>{formatPrice(delivery)}</span>
              </div>
              <div className="border-t border-[#e4beb3]/40 pt-3 flex justify-between font-bold text-[#151c27]">
                <span>Total</span>
                <span className="text-[#ae3200] text-xl">{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              fullWidth
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/checkout')}
            >
              Ir al checkout
            </Button>
            <button
              onClick={() => navigate('/products')}
              className="w-full mt-3 text-sm text-[#5b4038] hover:text-[#ae3200] transition-colors text-center"
            >
              Seguir comprando
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
