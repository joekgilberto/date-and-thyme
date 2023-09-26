import './Header.css';

import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header>
      <Link to="/">
        <h1>Date & Thyme</h1>
      </Link>
      <nav>
        <Link to="/fridge">
          <h2>fridge</h2>
        </Link>
        <Link to="/fridge/new">
          <h2>add groceries</h2>
        </Link>
        <Link to="/test">
          <h2>Tests</h2>
        </Link>
      </nav>
    </header>
  );
}