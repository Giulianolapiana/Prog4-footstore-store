import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4 text-center"
  >
    <div className="w-20 h-20 rounded-2xl bg-[#f0f3ff] flex items-center justify-center mb-5">
      <Icon className="w-10 h-10 text-[#8f7067]" />
    </div>
    <h3 className="text-lg font-semibold text-[#151c27] mb-2">{title}</h3>
    {description && <p className="text-sm text-[#5b4038] max-w-xs mb-6">{description}</p>}
    {action && <Button onClick={action.onClick} size="sm">{action.label}</Button>}
  </motion.div>
);
