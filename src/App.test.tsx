import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { mockResponse } from './constants';
import { HomePage } from './pages/HomePage';
import App from './App';

describe('App', () => {
  afterEach(cleanup);
  localStorage.clear();

  test('renders header links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
  });

  test('router test', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about us/i });

    userEvent.click(aboutLink);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
  });

  test('test not found page', () => {
    render(
      <MemoryRouter initialEntries={['/qwerty']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/this page doesnt exist\. go/i)).toBeInTheDocument();
  });

  test('expect to API call resolve', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    ) as jest.Mock;

    render(<HomePage />);
    userEvent.type(screen.getByRole('textbox'), 'Witcher');
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByRole('textbox')).toHaveValue('Witcher');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/movie?api_key=ec79681972e0c0a082743a6481ea4b2c&query=Witcher`
    );
    await waitFor(() => expect(screen.getByTestId('736759')).toBeInTheDocument());
    userEvent.clear(screen.getByRole('textbox'));
  });

  test('expect to API call reject', async () => {
    global.fetch = jest.fn(() => Promise.reject({ Error: 404 }));

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    userEvent.type(screen.getByRole('textbox'), 'Witcher');
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/movie?api_key=ec79681972e0c0a082743a6481ea4b2c&query=Witcher`
    );

    expect(screen.queryByRole('listitem')).toBeNull();
  });
});
