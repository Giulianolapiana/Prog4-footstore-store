import { useState } from 'react';

interface NavbarProps {
  cartCount?: number;
}

function IconButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      title={label}
      className="p-2.5 rounded-xl hover:bg-stone-100 transition-colors duration-200 text-lg hidden sm:block"
    >
      {icon}
    </button>
  );
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #ae3200, #ff5a1f)' }}
          >
            🍽️
          </div>
          <span
            className="font-black text-xl tracking-tight"
            style={{ color: '#ae3200', fontFamily: "'Playfair Display', serif" }}
          >
            FoodStore
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['Menú', 'Ofertas', 'Acerca'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <IconButton icon="📦" label="Pedidos" />
          <IconButton icon="👤" label="Usuario" />

          {/* Cart */}
          <div className="relative">
            <button className="relative p-2.5 rounded-xl hover:bg-stone-100 transition-colors duration-200">
              <span className="text-lg">🛒</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                  style={{ background: '#ae3200' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <div className="w-5 h-0.5 bg-stone-600 mb-1" />
            <div className="w-5 h-0.5 bg-stone-600 mb-1" />
            <div className="w-5 h-0.5 bg-stone-600" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 flex flex-col gap-3">
          {['Menú', 'Ofertas', 'Acerca'].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-stone-600 py-1">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}