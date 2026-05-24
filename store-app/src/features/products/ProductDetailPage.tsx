import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, AlertCircle, CheckCircle, Leaf, Info } from 'lucide-react';
import { productsService } from '../../shared/services/products.service';
import { useCartStore } from '../../store/cart.store';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { Skeleton } from '../../shared/ui/Skeleton';
import { QuantitySelector } from '../../shared/ui/QuantitySelector';
import { formatPrice } from '../../shared/lib/utils';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getById(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  const fallbackImg = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80';

  if (isLoading) return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="w-full aspect-square rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );

  if (isError || !product) return (
    <div className="max-w-container mx-auto px-4 py-16 text-center">
      <AlertCircle className="w-12 h-12 text-[#ba1a1a] mx-auto mb-3" />
      <p className="text-[#ba1a1a] font-medium">Producto no encontrado</p>
      <Button className="mt-4" variant="ghost" onClick={() => navigate('/products')}>
        Volver al menú
      </Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[#5b4038] hover:text-[#ae3200] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver
      </button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden bg-[#f0f3ff] aspect-square"
        >
          <img
            src={product.imagen_url || fallbackImg}
            alt={product.nombre}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-2">
            <Badge variant="neutral">{product.categoria?.nombre}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-[#151c27] mt-2 mb-3">{product.nombre}</h1>
          <div className="text-4xl font-bold text-[#ae3200] mb-4">{formatPrice(product.precio)}</div>

          {/* Availability */}
          <div className="flex items-center gap-2 mb-4">
            {product.disponible ? (
              <div className="flex items-center gap-1.5 text-green-700 text-sm font-medium">
                <CheckCircle className="w-4 h-4" /> Disponible
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#ba1a1a] text-sm font-medium">
                <AlertCircle className="w-4 h-4" /> No disponible
              </div>
            )}
            {product.stock !== undefined && (
              <span className="text-xs text-[#5b4038] ml-2">
                Stock: <span className="font-mono-label">{product.stock}</span>
              </span>
            )}
          </div>

          {/* Description */}
          {product.descripcion && (
            <p className="text-[#5b4038] leading-relaxed mb-6">{product.descripcion}</p>
          )}

          {/* Ingredients */}
          {product.ingredientes && product.ingredientes.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#151c27] mb-2">
                <Leaf className="w-4 h-4 text-green-600" /> Ingredientes
              </div>
              <div className="flex flex-wrap gap-2">
                {product.ingredientes.map((ing) => (
                  <span key={ing} className="bg-[#f0f3ff] text-[#5b4038] text-xs px-3 py-1 rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Alergenos */}
          {product.alergenos && product.alergenos.length > 0 && (
            <div className="mb-6 p-3 bg-[#ffdbd0]/40 rounded-xl border border-[#e4beb3]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#5b4038] mb-2">
                <Info className="w-4 h-4" /> Alérgenos
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.alergenos.map((al) => (
                  <Badge key={al} variant="warning">{al}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {product.disponible && (
            <div className="flex gap-3 items-center flex-wrap">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                max={product.stock}
              />
              <Button
                size="lg"
                leftIcon={<ShoppingCart className="w-4 h-4" />}
                onClick={handleAddToCart}
                className="flex-1"
              >
                {added ? '¡Agregado!' : 'Agregar al carrito'}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
