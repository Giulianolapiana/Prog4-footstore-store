import { useEffect } from 'react';
import { QueryProvider } from './app/providers/QueryProvider';
import { AppRouter } from './app/router/AppRouter';
import { useWsStore } from './store/useWsStore';
import './styles/globals.css';

function App() {
  const { connect, disconnect } = useWsStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
