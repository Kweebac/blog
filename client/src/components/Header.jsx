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
<<<<<<< HEAD
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
=======
          <Link to={"/register"}>Register</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
>>>>>>> f75d0e6 (Can now register an account)
        </li>
      </ul>
    </header>
  );
}

export default Header;
