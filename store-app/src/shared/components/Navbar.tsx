import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, ClipboardList, Utensils, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../../store/cart.store';
import { useAuthStore } from '../../store/auth.store';
import { authService } from '../services/auth.service';

export const Navbar = () => {
  const { getTotalItems, toggleCart } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e4beb3]/30 shadow-sm">
      <div className="max-w-container mx-auto px-4 md:px-10 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#ae3200] rounded-lg flex items-center justify-center">
            <Utensils className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-[#ae3200] tracking-tight hidden sm:block">
            FoodStore
          </span>
        </Link>

        {/* Nav links - desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/products">Menú</NavLink>
          {isAuthenticated && <NavLink to="/orders">Mis Pedidos</NavLink>}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Cart button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleCart}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#f0f3ff] transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-[#151c27]" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-[#ae3200] text-white text-[10px] font-bold rounded-full"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Orders */}
          {isAuthenticated && (
            <Link
              to="/orders"
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-[#f0f3ff] transition-colors"
            >
              <ClipboardList className="w-5 h-5 text-[#151c27]" />
            </Link>
          )}

          {/* User / Auth */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#f0f3ff] transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#ae3200] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {user?.nombre?.[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-[#151c27]">{user?.nombre?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#ffdad6] text-[#5b4038] hover:text-[#ba1a1a] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ae3200] text-white text-sm font-semibold hover:bg-[#852400] transition-colors"
            >
              <User className="w-4 h-4" />
              Ingresar
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#f0f3ff] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#e4beb3]/30 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>Inicio</MobileNavLink>
              <MobileNavLink to="/products" onClick={() => setMenuOpen(false)}>Menú</MobileNavLink>
              {isAuthenticated ? (
                <>
                  <MobileNavLink to="/orders" onClick={() => setMenuOpen(false)}>Mis Pedidos</MobileNavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Cerrar sesión
                  </button>
                </>
              ) : (
                <MobileNavLink to="/login" onClick={() => setMenuOpen(false)}>Ingresar</MobileNavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="px-4 py-2 text-sm font-medium text-[#5b4038] hover:text-[#ae3200] hover:bg-[#f0f3ff] rounded-lg transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-3 py-2.5 text-sm font-medium text-[#151c27] hover:bg-[#f0f3ff] rounded-lg transition-colors"
  >
    {children}
  </Link>
);
