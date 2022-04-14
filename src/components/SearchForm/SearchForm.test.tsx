import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';

test('test card search form component', () => {
  const container = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const inputEl = screen.getByTestId('input');
  expect(inputEl).toBeInTheDocument();
  expect(inputEl).toHaveAttribute('type', 'text');
  expect(container.getByPlaceholderText('Search for movie...'));
});

test('test input value', () => {
  const { unmount } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const inputEl = screen.getByTestId('input');
  userEvent.type(inputEl, 'test query');

  expect(screen.getByTestId('input')).toHaveValue('test query');

  unmount();
  expect(localStorage.__STORE__['inputValue']).toBe('test query');
});

test('should render cards after submit', async() => {
  render(<BrowserRouter><App/></BrowserRouter>);
  fireEvent.input(screen.getByRole('textbox'), { target: { value: 'The Witcher' } });
  fireEvent.submit(screen.getByRole('button', {name: /search/i}));
  const items = await screen.findAllByRole('listitem');
  await waitFor(() => expect(items).toHaveLength(11));
});
