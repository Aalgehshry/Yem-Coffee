import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found in index.html');
}

createRoot(container).render(
  // StrictMode surfaces unsafe lifecycles and impure renders during development
  // and is stripped from the production build.
  <StrictMode>
    <App />
  </StrictMode>,
);
