import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardAddForm from './CardAddForm';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';

describe('Card add form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  it('should render the basic fields', () => {
    render(<CardAddForm />);
    expect(screen.getByRole('textbox', { name: /title:/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/release date:/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /country:/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /age limit \+18/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /action/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/add poster/i)).toBeInTheDocument();
  });

  it('should render card after submit', async () => {

    render(<CardAddForm onSubmit={onSubmit} />);
    fireEvent.input(getTitle(), { target: { value: 'The Witcher' } });
    fireEvent.change(getDate(), { target: { value: '2020-01-15' } });
    fireEvent.change(getSelectCountry(), { target: { value: 'USA' } });
    fireEvent.click(getAgeLimitCheckbox());
    fireEvent.click(screen.getByLabelText(/action/i));

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const uploader = screen.getByLabelText(/add poster/i);
    fireEvent.change(uploader, { target: { files: [file] } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('The Witcher (2000)'));
  });
});

function getTitle() {
  return screen.getByRole('textbox', { name: /title:/i });
}

function getDate() {
  return screen.getByLabelText(/release date:/i);
}

function getSelectCountry() {
  return screen.getByRole('combobox', { name: /country:/i });
}

function getAgeLimitCheckbox() {
  return screen.getByTestId('ageCheckbox');
}

function getGenresCheckbox() {
  return screen.getByTestId('action');
}

function clickSubmitButton() {
  user.click(
    screen.getByRole('button', {
      name: /submit/i,
    })
  );
}
