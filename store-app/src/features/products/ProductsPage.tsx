import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { productsService } from '../../shared/services/products.service';
import { categoriesService } from '../../shared/services/categories.service';
import { ProductCard } from '../../shared/components/ProductCard';
import { CategoryCard } from '../../shared/components/CategoryCard';
import { ProductCardSkeleton } from '../../shared/ui/Skeleton';
import { EmptyState } from '../../shared/ui/EmptyState';
import { Input } from '../../shared/ui/Input';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const categoriaId = searchParams.get('categoria')
    ? Number(searchParams.get('categoria'))
    : undefined;

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', { search, categoriaId, page }],
    queryFn: () =>
      productsService.getAll({
        search: search || undefined,
        categoria_id: categoriaId,
        page,
        size: 12,
      }),
    placeholderData: (prev) => prev,
  });

  const handleCategorySelect = (id: number) => {
    if (categoriaId === id) {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: String(id) });
    }
    setPage(1);
  };

  const products = data?.items ?? [];
  const totalPages = data?.pages ?? 1;

  return (
    <div className="max-w-container mx-auto px-4 md:px-10 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#151c27] mb-1"
        >
          Nuestro Menú
        </motion.h1>
        <p className="text-[#5b4038]">
          {data?.total !== undefined ? `${data.total} productos disponibles` : 'Explorá todos nuestros platos'}
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Buscar hamburguesas, pizzas..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#e4beb3] text-[#5b4038] text-sm font-medium hover:border-[#ae3200] transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filtros</span>
        </button>
      </div>

      {/* Categories scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
        {categories?.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            selected={categoriaId === cat.id}
            onClick={() => handleCategorySelect(cat.id)}
          />
        ))}
      </div>

      {/* Products grid */}
      {isError ? (
        <div className="text-center py-16">
          <p className="text-[#ba1a1a] font-medium">Error al cargar productos. Intentá de nuevo.</p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No encontramos resultados"
          description="Intentá con otra búsqueda o categoría"
          action={{ label: 'Ver todos', onClick: () => { setSearch(''); setSearchParams({}); } }}
        />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e4beb3] disabled:opacity-40 hover:bg-[#f0f3ff] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-[#5b4038]">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e4beb3] disabled:opacity-40 hover:bg-[#f0f3ff] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
