import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState();
  const [errors, setErrors] = useState();

  useEffect(() => {
    (async () => {
      let res = await fetch(`http://localhost:5000/api/posts/${postId}/private`, {
        credentials: "include",
      });
      res = await res.json();

      if (res === false) navigate("/login");
      else setPostData(res);
    })();
  }, [postId, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    let body = {
      comments: postData.comments,
    };
    const formData = new FormData(e.target);
    formData.forEach((value, key) => {
      body[key] = value;
    });
    body = JSON.stringify(body);

    let res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      credentials: "include",
    });
    res = await res.json();

    if (res === false) navigate("/login");
    else if (typeof res === "string") navigate(res);
    else setErrors(res);
  }

  return (
    <main>
      <h1>Edit post ({postId})</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            Title:{" "}
            <input
              type="text"
              name="title"
              required
              defaultValue={postData && postData.title}
            />
          </label>
        </div>
        <div>
          <label>
            Body:{" "}
            <textarea
              name="body"
              cols="30"
              rows="10"
              required
              defaultValue={postData && postData.body}
            ></textarea>
          </label>
        </div>
        <div>
          <label>
            Private:
            {postData && postData.private ? (
              <input type="checkbox" name="private" defaultChecked />
            ) : (
              <input type="checkbox" name="private" />
            )}
          </label>
        </div>
        <br />
        <button>Edit post</button>
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
