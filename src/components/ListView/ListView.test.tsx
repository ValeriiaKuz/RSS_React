import { render, screen } from '@testing-library/react';
import { ListView } from './ListView';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

vi.mock('./CharacterCard', () => {
  return () => <div data-testid="character-card">Character Card</div>;
});

describe('ListView', () => {
  test('renders the specified number of character cards', () => {
    const mockData = [
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
      { id: 3, name: 'Character 3' }
    ];

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ListView data={mockData} />
        </BrowserRouter>
      </Provider>
    );

    const cards = screen.getAllByTestId('character-card');
    expect(cards).toHaveLength(mockData.length);
  });

  test('displays an appropriate message if no cards are present', () => {
    render(
      <BrowserRouter>
        <ListView data={[]} />
      </BrowserRouter>
    );

    const message = screen.getByText(/No characters there/i);
    expect(message).toBeInTheDocument();
  });
});
