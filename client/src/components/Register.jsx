import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:5000/api/register", {
        credentials: "include",
      });
      res = await res.json();
      if (res === false) navigate("/posts");
    })();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
    });
    res = await res.json();

    if (res === true) return navigate("/login");
    setErrors(res);
  }

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            Username: <input type="text" name="username" required minLength={3} />
          </label>
        </div>
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
        <button>Register</button>
      </form>
      {errors.length > 0 && (
        <>
          <h3>Errors</h3>
          <ul>
            {errors.map((error) => (
              <li key={crypto.randomUUID()}>{error.msg}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default Register;
