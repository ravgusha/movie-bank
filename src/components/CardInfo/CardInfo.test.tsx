import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';

describe('Card info popup', () => {
  it('should render after click on card', async() => {
    render(<BrowserRouter><App/></BrowserRouter>);
    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'The Witcher' } });
    fireEvent.submit(screen.getByRole('button', {name: /search/i}));
    const cards = await screen.findAllByRole('img');
    fireEvent.click(cards[1]);
    await waitFor(() => expect(screen.getByTestId('popup')).toBeInTheDocument());
  });
});
