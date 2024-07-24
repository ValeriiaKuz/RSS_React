import type { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { makeStore } from '../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(
  ui: JSX.Element,
  {
    preloadedState = {},
    store = makeStore(preloadedState),
    route = '/',
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
