import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cart.store';
import { QuantitySelector } from '../ui/QuantitySelector';
import { Button } from '../ui/Button';
import { formatPrice } from '../lib/utils';
import { EmptyState } from '../ui/EmptyState';

export const CartDrawer = () => {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, getSubtotal, getTotal } =
    useCartStore();

  const subtotal = getSubtotal();
  const delivery = subtotal > 0 ? 2.5 : 0;
  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#151c27]/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4beb3]/30">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#ae3200]" />
                <h2 className="text-lg font-semibold text-[#151c27]">Tu carrito</h2>
                {items.length > 0 && (
                  <span className="bg-[#ae3200] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f3ff] transition-colors"
              >
                <X className="w-4 h-4 text-[#5b4038]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <EmptyState
                  icon={ShoppingCart}
                  title="Tu carrito está vacío"
                  description="Agregá productos del menú para comenzar tu pedido"
                  action={{ label: 'Ver menú', onClick: closeCart }}
                />
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 bg-[#f9f9ff] rounded-xl p-3 border border-[#e4beb3]/20"
                  >
                    <img
                      src={item.product.imagen_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=70'}
                      alt={item.product.nombre}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=70';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-[#151c27] truncate">
                        {item.product.nombre}
                      </h4>
                      <p className="text-[#ae3200] font-bold text-sm mt-0.5">
                        {formatPrice(item.product.precio)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                          size="sm"
                        />
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#5b4038] hover:text-[#ba1a1a] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#e4beb3]/30 space-y-3 bg-white">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-[#5b4038]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#5b4038]">
                    <span>Delivery</span>
                    <span>{formatPrice(delivery)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#151c27] text-base pt-1 border-t border-[#e4beb3]/30">
                    <span>Total</span>
                    <span className="text-[#ae3200]">{formatPrice(total)}</span>
                  </div>
                </div>
                <Link to="/checkout" onClick={closeCart}>
                  <Button fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Ir al checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
