import { motion } from 'framer-motion';
import type { Category } from '../../features/products/types';
import { Beef, Pizza, Sandwich, Star, Coffee, IceCream, UtensilsCrossed } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  hamburguesas: <Beef className="w-6 h-6" />,
  pizzas: <Pizza className="w-6 h-6" />,
  lomos: <Sandwich className="w-6 h-6" />,
  empanadas: <UtensilsCrossed className="w-6 h-6" />,
  drinks: <Coffee className="w-6 h-6" />,
  desserts: <IceCream className="w-6 h-6" />,
};

interface CategoryCardProps {
  category: Category;
  selected?: boolean;
  onClick?: () => void;
}

export const CategoryCard = ({ category, selected, onClick }: CategoryCardProps) => {
  const icon = iconMap[category.nombre.toLowerCase()] ?? <Star className="w-6 h-6" />;
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 min-w-[80px] cursor-pointer ${
        selected
          ? 'border-[#ae3200] bg-[#ffdbd0] text-[#ae3200]'
          : 'border-[#e4beb3]/40 bg-white text-[#5b4038] hover:border-[#ae3200]/40 hover:bg-[#ffdbd0]/40'
      }`}
    >
      <div className={selected ? 'text-[#ae3200]' : 'text-[#8f7067]'}>{icon}</div>
      <span className="text-xs font-semibold whitespace-nowrap">{category.nombre}</span>
    </motion.button>
  );
};
