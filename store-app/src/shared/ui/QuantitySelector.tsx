import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}: QuantitySelectorProps) => {
  const btnSize = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-sm w-8' : 'text-base w-10';

  return (
    <div className="flex items-center gap-1 bg-[#f0f3ff] rounded-xl p-1">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${btnSize} flex items-center justify-center rounded-lg bg-white shadow-sm text-[#ae3200] disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#ffdbd0]`}
      >
        <Minus className="w-3.5 h-3.5" />
      </motion.button>
      <span className={`${textSize} text-center font-semibold text-[#151c27] select-none`}>
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${btnSize} flex items-center justify-center rounded-lg bg-[#ae3200] text-white shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-[#852400]`}
      >
        <Plus className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
};
