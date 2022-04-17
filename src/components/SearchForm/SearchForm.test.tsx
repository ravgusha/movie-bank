import { screen, render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SearchForm from './SearchForm';
import { HomePage } from '../../pages/HomePage';
import { fakeLocalStorage, mockResponse } from '../../constants';

describe('Search form', () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(cleanup);

  test('renders SearchFrom', () => {
    render(<SearchForm handleSubmit={handleSubmit} handleChange={handleChange} />);
    const inputEl = screen.getByTestId('input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText('Search for movie...'));
  });

  test('renders input if local storage is empty', () => {
    render(<HomePage />);
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  test('handle change event', () => {
    render(<HomePage />);
    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Spiderman' },
    });

    expect(screen.getByDisplayValue('Spiderman')).toBeInTheDocument();
  });

  test('renders input if local storage not empty', () => {
    window.localStorage.setItem('inputValue', 'Spiderman');
    render(<HomePage />);
    expect(screen.getByDisplayValue('Spiderman')).toBeInTheDocument();
  });

  test('display spinner', () => {
    render(<HomePage />);
    userEvent.type(screen.getByRole('textbox'), 'The Witcher');
    fireEvent.submit(screen.getByRole('button', { name: /search/i }));

    waitFor(() => expect(screen.getByTestId('spinner')).toBeInTheDocument());
  });

  test('expect to API call with exactly url', async () => {
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
  });
});
