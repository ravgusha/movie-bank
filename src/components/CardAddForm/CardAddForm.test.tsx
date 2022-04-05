import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import CardAddForm from './CardAddForm';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';

// test('test card rendering after submit', () => {
//   render(
//     <BrowserRouter>
//       <CardAddForm />
//     </BrowserRouter>
//   );

//   expect(container.getByText('Find Your Perfect Movie'));
// });

describe('MultiStepForm', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<CardAddForm onSubmit={onSubmit} />);
  });

  it('onSubmit is called when all fields pass validation', async () => {
    // simulate ulpoad event and wait until finish
    await waitFor(() => {
      user.type(getTitle(), 'The Witcher');
      selectCountry('USA');
      user.type(getDate(), '10-12-2020');
      user.click(getAgeLimitCheckbox());
      user.click(getGenresCheckbox());
      const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
      let uploader = screen.getByLabelText(/add poster/i);

      fireEvent.change(uploader, {
        target: { files: [file] },
      });
    });
    clickSubmitButton();

    expect(screen.getByText('The Witcher')).toBeInTheDocument();
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

function selectCountry(country: string) {
  const dropdown = getSelectCountry();
  user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: country }));
}

function getAgeLimitCheckbox() {
  return screen.getByTestId('ageCheckbox');
}

function getGenresCheckbox() {
  return screen.getByRole('checkbox', { name: /comedy/i });
}

function clickSubmitButton() {
  user.click(
    screen.getByRole('button', {
      name: /submit/i,
    })
  );
}
