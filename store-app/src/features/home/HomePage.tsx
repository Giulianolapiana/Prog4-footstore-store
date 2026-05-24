import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles, Tag } from 'lucide-react';
import { productsService } from '../../shared/services/products.service';
import { categoriesService } from '../../shared/services/categories.service';
import { ProductCard } from '../../shared/components/ProductCard';
import { CategoryCard } from '../../shared/components/CategoryCard';
import { ProductCardSkeleton } from '../../shared/ui/Skeleton';
import { Button } from '../../shared/ui/Button';
import { useState } from 'react';

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });


  const { data: destacados, isLoading: loadingDestacados } = useQuery({
    queryKey: ['products', 'destacados'],
    queryFn: productsService.getDestacados,
  });

  return (
    <div>
      {/* Hero */}
      <section className="mx-4 md:mx-10 mt-6 rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#151c27] to-[#2a313d] min-h-[340px] md:min-h-[420px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151c27]/90 via-[#151c27]/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 p-8 md:p-14 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 bg-[#ae3200]/20 border border-[#ae3200]/40 text-[#ffb59e] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Tag className="w-3.5 h-3.5" />
            Oferta especial
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            50% DE DESCUENTO<br />
            <span className="text-[#ffb59e]">en tu primer pedido</span>
          </h1>
          <p className="text-[#ebf1ff]/70 text-sm mb-6">
            Usá el código: <span className="font-mono-label text-[#ffb59e] bg-[#ae3200]/20 px-2 py-0.5 rounded">BIENVENIDO50</span>
          </p>
          <Button onClick={() => navigate('/products')} size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Pedir Ahora
          </Button>
        </motion.div>
      </section>

      <div className="max-w-container mx-auto px-4 md:px-10">
        {/* Categories */}
        <section className="mt-10">
          <SectionHeader title="Categorías" icon={<Sparkles className="w-4 h-4" />} />
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar"
          >
            {categories?.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <CategoryCard
                  category={cat}
                  selected={selectedCategory === cat.id}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                    navigate(`/products?categoria=${cat.id}`);
                  }}
                />
              </motion.div>
            )) ?? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-20 h-24 rounded-2xl bg-[#e7eefe] animate-pulse shrink-0" />
              ))
            )}
          </motion.div>
        </section>



        {/* Destacados */}
        {(destacados?.length ?? 0) > 0 && (
          <section className="mt-12 mb-4">
            <div className="flex items-center justify-between mb-6">
              <SectionHeader title="Destacados" icon={<Sparkles className="w-4 h-4 text-[#ae3200]" />} />
            </div>
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {loadingDestacados
                ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : destacados?.slice(0, 4).map((product) => (
                    <motion.div key={product.id} variants={fadeUp}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
            </motion.div>
          </section>
        )}

        {/* Promo Banner */}
        <section className="mt-12 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-[#ae3200] to-[#ff5a1f] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">¿Primera vez en FoodStore?</h2>
              <p className="text-white/80">Registrate y obtené 50% OFF en tu primer pedido.</p>
            </div>
            <Button variant="ghost" className="bg-white text-[#ae3200] hover:bg-white/90 shrink-0" onClick={() => navigate('/register')}>
              Crear cuenta gratis
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
  <h2 className="text-xl md:text-2xl font-bold text-[#151c27] flex items-center gap-2 mb-5">
    {icon}
    {title}
  </h2>
);
