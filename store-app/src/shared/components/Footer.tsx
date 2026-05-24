import { Link } from 'react-router-dom';
import { Utensils, Share2, MessageCircle, Heart } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-[#151c27] text-[#ebf1ff] mt-20">
    <div className="max-w-container mx-auto px-4 md:px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#ae3200] rounded-lg flex items-center justify-center">
              <Utensils className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">FoodStore</span>
          </div>
          <p className="text-sm text-[#ebf1ff]/60 leading-relaxed max-w-sm">
            La mejor comida de la ciudad, directo a tu puerta. Rápido, fresco y delicioso.
          </p>
          <div className="flex gap-3 mt-4">
            {[Share2, MessageCircle, Heart].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#ae3200] transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Navegación</h4>
          <ul className="space-y-2 text-sm text-[#ebf1ff]/60">
            {([['/', 'Inicio'], ['/products', 'Menú'], ['/orders', 'Mis Pedidos'], ['/cart', 'Carrito']] as [string, string][]).map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-[#ffb59e] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Contacto</h4>
          <ul className="space-y-2 text-sm text-[#ebf1ff]/60">
            <li>info@foodstore.com</li>
            <li>+54 261 555-1234</li>
            <li>Mendoza, Argentina</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#ebf1ff]/40">
        <span>© 2026 FoodStore. Todos los derechos reservados.</span>
        <span>Hecho con ♥ en Mendoza</span>
      </div>
    </div>
  </footer>
);
