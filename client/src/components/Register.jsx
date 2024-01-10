import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState();
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
    });
    res = await res.json();
<<<<<<< HEAD
    console.log(2);
    console.log(res);

=======
>>>>>>> f75d0e6 (Can now register an account)
    setErrors(res.errors);
    setFormData(res.formData);
  }

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            Username:{" "}
            <input
              type="text"
              name="username"
              required
              minLength={3}
              defaultValue={formData && formData.username}
            />
          </label>
        </div>
        <div>
          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              required
              defaultValue={formData && formData.email}
            />
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
