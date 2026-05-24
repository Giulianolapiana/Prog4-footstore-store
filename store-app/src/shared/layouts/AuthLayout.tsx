import { Outlet, Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

export const AuthLayout = () => (
  <div className="min-h-screen bg-[#f9f9ff] flex flex-col">
    <div className="p-6">
      <Link to="/" className="inline-flex items-center gap-2">
        <div className="w-8 h-8 bg-[#ae3200] rounded-lg flex items-center justify-center">
          <Utensils className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-lg text-[#ae3200]">FoodStore</span>
      </Link>
    </div>
    <div className="flex-1 flex items-center justify-center px-4 pb-12">
      <Outlet />
    </div>
  </div>
);
