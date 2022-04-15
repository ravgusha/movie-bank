import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

test('test card component', async () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  fireEvent.input(screen.getByRole('textbox'), { target: { value: 'The SpiderMan' } });
  fireEvent.submit(screen.getByRole('button', { name: /search/i }));
  const items = await screen.findAllByRole('listitem');
  await waitFor(() => expect(items).toBeTruthy());
});
