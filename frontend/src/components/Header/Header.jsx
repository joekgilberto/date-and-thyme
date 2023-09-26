import './Header.css';

import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header>
      <h1>Date & Thyme</h1>
      <nav>
        <Link to="/">
            <h2>Home</h2>
        </Link>
        <Link to="/test">
            <h2>Tests</h2>
        </Link>
      </nav>
    </header>
  );
}