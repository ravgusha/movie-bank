import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import * as constants from '../../../../App';
import { mockResponse, fakeGenres } from '../../../../constants';
import { Home } from '../../../../containers/Home';

describe('CardInfo', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    ) as jest.Mock;

    Object.defineProperty(constants, 'genresList', {
      value: fakeGenres.genres,
    });
  });

  test('should render card info popup after click on card', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    userEvent.type(screen.getByRole('textbox'), 'Witcher');
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));

    const cards = await screen.findAllByTestId('card');
    userEvent.click(cards[0]);
    await waitFor(() =>
      expect(screen.getByText(mockResponse.results[0].title)).toBeInTheDocument()
    );
  });

  test('should close card info popup after click on close button', async () => {
    render(
      <BrowserRouter>
        <Home/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByRole('textbox'), 'Witcher');
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));

    const cards = await screen.findAllByTestId('card');
    userEvent.click(cards[0]);
    const popup = screen.getByTestId('popup');
    const closeBtn = await screen.findByTestId('closeBtn');
    userEvent.click(closeBtn);
    await waitFor(() => expect(popup).not.toBeInTheDocument());
  });
});
