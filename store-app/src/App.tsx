import { QueryProvider } from './app/providers/QueryProvider';
import { AppRouter } from './app/router/AppRouter';
import './styles/globals.css';

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
