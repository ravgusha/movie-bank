import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';
import { mockResponse } from '../../constants';

describe('CardList', () => {
  test('renders card list component', async () => {
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
    const items = await screen.findAllByRole('listitem');
    await waitFor(() => expect(items).toHaveLength(3));
  });
});
