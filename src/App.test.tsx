import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

  
});
