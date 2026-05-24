import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { authService } from '../../shared/services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' });
  const [error, setError] = useState('');

  const { mutate: register, isPending } = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.user);
      navigate('/');
    },
    onError: () => {
      setError('No se pudo crear la cuenta. Intentá de nuevo.');
    },
  });

  const handleSubmit = () => {
    if (!form.nombre || !form.apellido || !form.email || !form.password) return;
    setError('');
    register(form);
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-3xl shadow-lg border border-[#e4beb3]/30 p-8">
        <h1 className="text-2xl font-bold text-[#151c27] mb-1">Crear cuenta</h1>
        <p className="text-[#5b4038] text-sm mb-7">Unité a FoodStore hoy</p>

        <div className="space-y-4">
          <Input label="Nombre completo" placeholder="Juan Pérez" value={form.nombre}
            onChange={set('nombre')} leftIcon={<User className="w-4 h-4" />} />
          <Input label="Email" type="email" placeholder="tu@email.com" value={form.email}
            onChange={set('email')} leftIcon={<Mail className="w-4 h-4" />} />
          <Input label="Apellido" placeholder="Pérez" value={form.apellido}
            onChange={set('apellido')} leftIcon={<User className="w-4 h-4" />} />
          <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" value={form.password}
            onChange={set('password')} leftIcon={<Lock className="w-4 h-4" />} />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[#ba1a1a] bg-[#ffdad6] py-2 px-3 rounded-lg text-center"
            >
              {error}
            </motion.p>
          )}

          <Button fullWidth size="lg" loading={isPending} onClick={handleSubmit}>
            Crear cuenta
          </Button>
        </div>

        <p className="text-center text-sm text-[#5b4038] mt-6">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-[#ae3200] font-semibold hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
