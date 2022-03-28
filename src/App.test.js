import { screen, render, within} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import App from "./App";
import CardList from "./components/CardList/CardList";

test("test card list component", () => {
  const container = render(<BrowserRouter><App /></BrowserRouter>);
  expect(container.getByTestId('cards')).toBeInTheDocument();
});

test("test card component", () => {
  render(<CardList />)
  const list = screen.getByRole("list")
  const { getAllByRole } = within(list)
  const items = getAllByRole("listitem")
  expect(items).toBeTruthy();
})