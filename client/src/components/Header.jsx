import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>Kweebac&apos;s Blogs</div>
      <ul>
        <li>
          <Link to="/posts">All posts</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
