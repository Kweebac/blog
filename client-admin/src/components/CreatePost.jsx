import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let res = await fetch("https://kweebac-blog-api.up.railway.app/api/checkAdmin", {
        credentials: "include",
      });
      res = await res.json();

      if (res === false) navigate("/login");
    })();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await fetch("https://kweebac-blog-api.up.railway.app/api/posts", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
      credentials: "include",
    });
    res = await res.json();

    if (res === false) navigate("/login");
    else if (typeof res === "string") navigate(res);
    else setErrors(res);
  }

  return (
    <main>
      <h1>New post</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            Title: <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            Body: <textarea name="body" cols="30" rows="10" required></textarea>
          </label>
        </div>
        <div>
          <label>
            Private: <input type="checkbox" name="private" />
          </label>
        </div>
        <br />
        <button>Create post</button>
      </form>
      {errors && (
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

export default CreatePost;
