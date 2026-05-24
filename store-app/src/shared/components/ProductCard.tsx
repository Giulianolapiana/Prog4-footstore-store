import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cart.store';
import { formatPrice } from '../lib/utils';

interface ProductCardProps { product: Product; }

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation(); addToCart(product);
  };
  const fallbackImg = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#e4beb3]/30 hover:border-[#ae3200]/20 hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden h-48 bg-[#f0f3ff]">
          <img
            src={product.imagen_url || fallbackImg}
            alt={product.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          />
          {!product.disponible && (
            <div className="absolute inset-0 bg-[#151c27]/60 flex items-center justify-center">
              <span className="bg-white text-[#151c27] text-xs font-semibold px-3 py-1.5 rounded-full">No disponible</span>
            </div>
          )}
          {product.mas_vendido && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#ae3200] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              <Star className="w-3 h-3 fill-current" /> Más vendido
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-1">
            <span className="text-xs font-mono text-[#8f7067] uppercase tracking-wider">{product.categoria?.nombre}</span>
          </div>
          <h3 className="font-semibold text-[#151c27] text-base leading-tight mb-1 line-clamp-1">{product.nombre}</h3>
          {product.descripcion && (
            <p className="text-xs text-[#5b4038] line-clamp-2 leading-relaxed mb-3">{product.descripcion}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#ae3200]">{formatPrice(product.precio)}</span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleAdd}
              disabled={!product.disponible}
              className="w-9 h-9 flex items-center justify-center bg-[#ae3200] text-white rounded-full shadow-sm hover:bg-[#852400] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
