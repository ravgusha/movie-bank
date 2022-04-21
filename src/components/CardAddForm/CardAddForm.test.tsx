import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardAddForm from './CardAddForm';

describe('Card add form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  test('should render the basic fields', () => {
    render(<CardAddForm />);
    expect(getTitle()).toBeInTheDocument();
    expect(getDate()).toBeInTheDocument();
    expect(getSelectGenre()).toBeInTheDocument();
    expect(getAgeLimitCheckbox()).toBeInTheDocument();
    expect(getSubtitlesCheckbox()).toBeInTheDocument();
    expect(getPoster()).toBeInTheDocument();
  });

  test('should render card when submit correct values', async () => {
    render(<CardAddForm onSubmit={onSubmit} />);
    fireEvent.input(getTitle(), { target: { value: 'The Witcher' } });
    fireEvent.change(getDate(), { target: { value: '2020-01-15' } });
    fireEvent.change(getSelectGenre(), { target: { value: 'action' } });
    fireEvent.click(getAgeLimitCheckbox());
    fireEvent.click(getSubtitlesCheckbox());

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const uploader = screen.getByLabelText(/add poster/i);
    fireEvent.change(uploader, { target: { files: [file] } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    waitFor(() => expect(screen.getByRole('img')));
  });

  test('should render errors when submit incorrect values', async () => {
    render(<CardAddForm onSubmit={onSubmit} />);
    fireEvent.input(getTitle(), {
      target: { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    });
    fireEvent.change(getDate(), { target: { value: '2023-01-15' } });

    fireEvent.change(getSelectGenre(), { target: { value: 'action' } });
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const uploader = screen.getByLabelText(/add poster/i);
    fireEvent.change(uploader, { target: { files: [file] } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    waitFor(() => {
      expect(screen.getByText('Max length is 25'));
      expect(screen.getByText('Date cannot be in the future'));
    });
  });

  test('should render errors when submit empty required fields', async () => {
    render(<CardAddForm onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    waitFor(() => {
      expect(screen.getByText('Title is required'));
      expect(screen.getByText('Date is required'));
      expect(screen.getByText('Language is required'));
      expect(screen.getByText('Poster is required'));
    });
  });
});

function getTitle() {
  return screen.getByRole('textbox', { name: /title:/i });
}

function getDate() {
  return screen.getByLabelText(/release date:/i);
}

function getSelectGenre() {
  return screen.getByRole('combobox');
}

function getAgeLimitCheckbox() {
  return screen.getByRole('checkbox', { name: /age limit \+18:/i });
}

function getSubtitlesCheckbox() {
  return screen.getByRole('checkbox', { name: /video:/i });
}

function getPoster() {
  return screen.getByLabelText(/add poster/i);
}
