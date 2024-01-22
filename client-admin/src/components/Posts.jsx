import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(posts);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/private", {
          credentials: "include",
        });
        const posts = await res.json();
        setPosts(posts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <main>
      <h1>Posts</h1>
      <section className="posts">
        {posts && posts.length ? (
          posts.map((post) => {
            return (
              <Link to={`/posts/${post._id}`} key={post._id}>
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
