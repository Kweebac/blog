import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:5000/api/isAuthenticated", {
        credentials: "include",
      });
      res = await res.json();
      setIsAuthenticated(res);
    })();
  });

  async function handleLogout() {
    try {
      let res = await fetch("http://localhost:5000/api/logout", {
        credentials: "include",
      });
      res = await res.json();
      if (res === false) navigate("/posts");
      if (res === true) navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <header>
      <div>Kweebac&apos;s Blogs</div>
      <ul>
        <li>
          <Link to="/posts">All posts</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/posts/create">New post</Link>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
