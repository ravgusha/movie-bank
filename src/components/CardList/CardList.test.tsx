import { render } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';

test('test card list component', () => {
  const container = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(container.getByTestId('cards')).toBeInTheDocument();
});
