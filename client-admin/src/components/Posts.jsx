import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/private", {
          credentials: "include",
        });
        const posts = await res.json();
        if (posts === false) return navigate("/login");

        setPosts(posts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, [navigate]);

  async function handleClick(post) {
    await fetch(`http://localhost:5000/api/posts/${post._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    let res = await fetch(`http://localhost:5000/api/posts/private`, {
      credentials: "include",
    });
    res = await res.json();
    setPosts(res);
  }

  return (
    <main>
      <h1>Posts</h1>
      <section className="posts">
        {posts && posts.length ? (
          posts.map((post) => {
            return (
              <div className="postItem" key={post._id}>
                <Link to={`/posts/${post._id}`}>
                  <div className="post">
                    <div>
                      <span>{post.author.username}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3>{post.title}</h3>
                    {post.private ? (
                      <div className="unpublished">Unpublished</div>
                    ) : (
                      <div className="published">Published</div>
                    )}
                  </div>
                </Link>
                <svg
                  onClick={() => handleClick(post)}
                  className="delete"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>delete</title>
                  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
              </div>
            );
          })
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>There are no posts yet</p>
        )}
      </section>
    </main>
  );
}

export default Posts;
