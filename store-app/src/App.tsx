import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './app/providers/QueryProvider';
import { AppRouter } from './app/router/AppRouter';
import { initializeMercadoPago } from './features/pagos/config/mp';
import './styles/globals.css';

function App() {
  useEffect(() => {
    initializeMercadoPago();
  }, []);

  return (
    <QueryProvider>
      <Toaster />
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
