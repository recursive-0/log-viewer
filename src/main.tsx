import { Dashboard } from '@/components/features/dashboard/dashboard';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ThemeProvider } from './providers/theme-provider';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root Element not found!');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  </StrictMode>
);
