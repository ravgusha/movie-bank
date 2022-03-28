import { screen, render, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import CardList from './components/CardList/CardList';

test('test header component', () => {
  const container = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(container.getByTestId('header')).toBeInTheDocument();
});

test('test main text component', () => {
  const container = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(container.getByText('Find Your Perfect Movie'));
});

test('test card list component', () => {
  const container = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(container.getByTestId('cards')).toBeInTheDocument();
});

test('test card search form component', () => {
  const container = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const inputEl = screen.getByTestId("input");
  expect(inputEl).toBeInTheDocument();
  expect(inputEl).toHaveAttribute("type", "text");
  expect(container.getByPlaceholderText('Search for movie...'));
});

test('test input value', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const inputEl = screen.getByTestId("input");
  userEvent.type(inputEl, "test query");

  expect(screen.getByTestId("input")).toHaveValue("test query");
});


test('test card component', () => {
  render(<CardList />);
  const list = screen.getByRole('list');
  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items).toBeTruthy();
});
