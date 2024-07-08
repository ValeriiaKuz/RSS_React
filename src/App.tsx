import './App.css';
import { Component } from 'react';
import { MainPage } from './pages/Main/MainPage';
import { ErrorComponent } from './components/Error/ErrorComponent';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary fallback={<ErrorComponent message={''} />}>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
