import { screen, render, within } from '@testing-library/react';
import CardList from '../CardList/CardList';

test('test card component', () => {
    render(<CardList />);
    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items).toBeTruthy();
  });
  