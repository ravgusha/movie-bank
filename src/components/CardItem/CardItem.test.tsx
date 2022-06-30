import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../../App';
import { mockResponse } from '../../constants';

describe('Card item', () => {
  test('renders card component', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  ) as jest.Mock;
  
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'The Witcher' } });
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));
    const cards = await screen.findAllByRole('listitem');
    await waitFor(() => expect(cards[1]).toBeInTheDocument());
  });
});
