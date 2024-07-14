import './App.css';
import { ErrorComponent } from './components/Error/ErrorComponent';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorComponent message={''} />}>
      <Outlet />
    </ErrorBoundary>
  );
};
