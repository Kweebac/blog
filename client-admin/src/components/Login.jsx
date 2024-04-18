import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let res = await fetch("https://kweebac-blog-api.up.railway.app/api/login", {
        credentials: "include",
      });
      res = await res.json();

      if (res === false) navigate("/posts");
    })();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await fetch("https://kweebac-blog-api.up.railway.app/api/login", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
      credentials: "include",
    });
    res = await res.json();

    if (res.loggedIn) navigate("/posts");
    else setError(res.error);
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
