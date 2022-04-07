import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardAddForm from './CardAddForm';

describe('Card add form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  it('should render the basic fields', () => {
    render(<CardAddForm />);
    expect(getTitle()).toBeInTheDocument();
    expect(getDate()).toBeInTheDocument();
    expect(getSelectGenre()).toBeInTheDocument();
    expect(getAgeLimitCheckbox()).toBeInTheDocument();
    expect(getSubtitlesCheckbox()).toBeInTheDocument();
    expect(getPoster()).toBeInTheDocument();
  });

  it('should render card after submit', () => {
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

    expect(screen.getByText('The Witcher (2020)'));
  });
});

function getTitle() {
  return screen.getByRole('textbox', { name: /title:/i });
}

function getDate() {
  return screen.getByLabelText(/release date:/i);
}

function getSelectGenre() {
  return screen.getByRole('combobox', { name: /genre:/i });
}

function getAgeLimitCheckbox() {
  return screen.getByTestId('ageCheckbox');
}

function getSubtitlesCheckbox() {
  return screen.getByRole('checkbox', { name: /subtitles:/i });
}

function getPoster() {
  return screen.getByLabelText(/add poster/i);
}
