import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

vi.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: vi.fn()
  })
}));

describe('main ', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(true).toBe(true);
  });
});
