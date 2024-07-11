import './App.css';
import { MainPage } from './pages/Main/MainPage';
import { ErrorComponent } from './components/Error/ErrorComponent';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

export const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorComponent message={''} />}>
      <MainPage />
    </ErrorBoundary>
  );
};
