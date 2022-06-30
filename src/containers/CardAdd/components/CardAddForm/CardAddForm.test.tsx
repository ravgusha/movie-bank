import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardAddForm from './CardAddForm';
import userEvent from '@testing-library/user-event';

describe('Card add form', () => {
  global.URL.createObjectURL = jest.fn();

  test('should render the basic fields', () => {
    render(<CardAddForm />);
    expect(getTitle()).toBeInTheDocument();
    expect(getDate()).toBeInTheDocument();
    expect(getSelectedLanguage()).toBeInTheDocument();
    expect(getAgeLimitCheckbox()).toBeInTheDocument();
    expect(getSubtitlesCheckbox()).toBeInTheDocument();
    expect(getPoster()).toBeInTheDocument();
  });

  test('should render card when submit correct values', async () => {
    render(<CardAddForm/>);
    fireEvent.input(getTitle(), { target: { value: 'The Witcher' } });
    fireEvent.change(getDate(), { target: { value: '2020-01-15' } });
    fireEvent.change(getSelectedLanguage(), { target: { value: 'english' } });
    fireEvent.click(getAgeLimitCheckbox());
    fireEvent.click(getSubtitlesCheckbox());

    const file = new File(['img'], 'img.png', { type: 'image/png' });
    const uploader = screen.getByLabelText(/add poster/i);
    userEvent.upload(uploader, file);
    expect((uploader as HTMLInputElement).files).toHaveLength(1);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    waitFor(async () => (expect(await screen.findByTestId('card'))));
  });

  test('should render errors when submit incorrect values', async () => {
    render(<CardAddForm />);
    fireEvent.input(getTitle(), {
      target: { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    });
    fireEvent.change(getDate(), { target: { value: '2023-01-15' } });

    fireEvent.change(getSelectedLanguage(), { target: { value: 'english' } });
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const uploader = screen.getByLabelText(/add poster/i);
    fireEvent.change(uploader, { target: { files: [file] } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(screen.findByText('Max length is 25'));
    expect(screen.findByText('Date cannot be in the future'));
  });

  test('should render errors when submit empty required fields', async () => {
    render(<CardAddForm />);
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(screen.findByText('Title is required'));
    expect(screen.findByText('Date is required'));
    expect(screen.findByText('Language is required'));
    expect(screen.findByText('Poster is required'));
  });
});

function getTitle() {
  return screen.getByRole('textbox', { name: /title:/i });
}

function getDate() {
  return screen.getByLabelText(/release date:/i);
}

function getSelectedLanguage() {
  return screen.getByTestId('language');
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
