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
    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'The SpiderMan' } });
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));
    const item = await screen.findByRole('listitem');
    await waitFor(() => expect(item).toBeTruthy());
  });
});
