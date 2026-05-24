import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { authService } from '../../shared/services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      navigate('/');
    },
    onError: () => {
      setError('Email o contraseña incorrectos');
    },
  });

  const handleSubmit = () => {
    if (!email || !password) return;
    setError('');
    login({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-3xl shadow-lg border border-[#e4beb3]/30 p-8">
        <h1 className="text-2xl font-bold text-[#151c27] mb-1">Bienvenido de vuelta</h1>
        <p className="text-[#5b4038] text-sm mb-7">Iniciá sesión para continuar</p>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[#ba1a1a] font-medium text-center bg-[#ffdad6] py-2 px-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <Button
            fullWidth
            size="lg"
            loading={isPending}
            onClick={handleSubmit}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Iniciar sesión
          </Button>
        </div>

        <p className="text-center text-sm text-[#5b4038] mt-6">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="text-[#ae3200] font-semibold hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
