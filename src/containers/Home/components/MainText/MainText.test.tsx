import { render } from '@testing-library/react';
import App from '../../../../App';
import { BrowserRouter } from 'react-router-dom';

test('test main text component', () => {
    const container = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container.getByText('Find Your Perfect Movie'));
  });
  