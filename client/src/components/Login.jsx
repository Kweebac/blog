import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:5000/api/login", {
        credentials: "include",
      });
      res = await res.json();
      if (res === false) navigate("/posts");
      if (typeof res === "string") setError(res);
    })();
  }, [navigate]);

  return (
    <main>
      <h1>Login</h1>
      <form method="post" action="http://localhost:5000/api/login">
        <div>
          <label>
            Email: <input type="email" name="email" required />
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="password" required minLength={8} />
          </label>
        </div>
        <br />
        <button>Login</button>
      </form>
      {error && (
        <>
          <h3>Errors</h3>
          <ul>
            <li>{error}</li>
          </ul>
        </>
      )}
    </main>
  );
}

export default Login;
