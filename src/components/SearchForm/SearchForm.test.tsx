import { screen, render } from '@testing-library/react';
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
