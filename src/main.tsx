import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Error } from './components/Error/Error';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error message={''} />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
