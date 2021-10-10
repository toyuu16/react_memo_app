import { render, screen } from '@testing-library/react';
import Board from './Board';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users">Users</Link>

      <Switch>
        <Route path="/about">
          <h1>About</h1>
        </Route>
        <Route path="/users">
          <h1>Users</h1>
        </Route>
        <Route path="/">
          <h1>Home</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

test('renders learn react link', () => {
  // render(<Board />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
