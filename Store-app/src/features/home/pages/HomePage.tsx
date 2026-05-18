export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [toast, setToast] = useState(null);
   
    const handleAdd = (product) => {
      setCartCount((c) => c + 1);
      setToast(product);
      setTimeout(() => setToast(null), 2500);
    };
   
    return (
      <>
        {/* Google Fonts */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
   
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-12px); }
          }
          @keyframes slideUp {
            from { transform: translateX(-50%) translateY(24px); opacity: 0; }
            to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
          }
        `}</style>
   
        <div className="min-h-screen" style={{ background: "#f9f9ff" }}>
          <Navbar cartCount={cartCount} />
   
          {/* Hero */}
          <Hero onCTA={() => {}} />
   
          {/* Search bar */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Buscar hamburguesas, pizzas, lomos…"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-stone-200 text-stone-700 placeholder:text-stone-400 text-sm font-medium outline-none focus:ring-2 transition-all duration-200 shadow-sm"
                style={{ focusRingColor: "#ae3200" }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(174,50,0,0.15)")}
                onBlur={(e) => (e.target.style.boxShadow = "")}
              />
            </div>
          </div>
   
          {/* Categories */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
            <SectionTitle label="Categorías" sublabel="¿Qué se te antoja hoy?" />
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="snap-start">
                  <CategoryCard
                    category={cat}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  />
                </div>
              ))}
            </div>
          </section>
   
          {/* Most sold */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 mb-16">
            <div className="flex items-end justify-between mb-6">
              <SectionTitle label="Más Vendidos" sublabel="Los favoritos de nuestros clientes" />
              <a href="#" className="text-sm font-semibold hidden sm:block transition-colors duration-200 hover:opacity-70 mb-2"
                 style={{ color: "#ae3200" }}>
                Ver todos →
              </a>
            </div>
   
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={handleAdd} />
              ))}
            </div>
   
            {/* Mobile: ver todos */}
            <div className="mt-6 flex justify-center sm:hidden">
              <a href="#"
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white"
                 style={{ background: "linear-gradient(135deg, #ae3200, #ff5a1f)" }}>
                Ver todos los productos →
              </a>
            </div>
          </section>
   
          {/* Promotional banner strip */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
            <div
              className="rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ background: "linear-gradient(135deg, #1a0800, #3d1000)" }}
            >
              <div>
                <p className="text-[#ffb59e] text-xs font-bold tracking-widest uppercase mb-2">Descarga la app</p>
                <h3 className="text-white font-black text-xl sm:text-2xl mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                  Pedí más fácil y rápido
                </h3>
                <p className="text-stone-400 text-sm">Recibí notificaciones en tiempo real de tu pedido.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="px-5 py-2.5 rounded-2xl text-sm font-bold bg-white text-stone-900 hover:bg-stone-100 transition-colors">
                  📱 App Store
                </button>
                <button className="px-5 py-2.5 rounded-2xl text-sm font-bold bg-white text-stone-900 hover:bg-stone-100 transition-colors">
                  🤖 Google Play
                </button>
              </div>
            </div>
          </div>
   
          {/* Footer strip */}
          <footer className="border-t border-stone-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-400 text-sm">
              <span>© 2024 <strong className="text-stone-600">FoodStore</strong>. Todos los derechos reservados.</span>
              <span>Hecho con ❤️ en Mendoza, Argentina</span>
            </div>
          </footer>
        </div>
   
        {/* Cart toast */}
        {toast && <CartToast item={toast} onClose={() => setToast(null)} />}
      </>
    );
  }