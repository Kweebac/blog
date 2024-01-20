import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const post = await res.json();
        setPost(post);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
      credentials: "include",
    });
  }

  return (
    <main>
      {post ? (
        <>
          <section>
            <div className="post detailedPost" key={post._id}>
              <div>
                <span>{post.author.username}</span>
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <div>{post.body}</div>
            </div>
          </section>
          <section>
            <h3>New comment</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <textarea name="body" id="" cols="60" rows="5"></textarea>
              </div>
              <input type="text" name="postId" defaultValue={post._id} hidden />
              <button>New comment</button>
            </form>
            {post.comments.length > 0 && (
              <>
                <h1>Comments</h1>
                {post.comments.map((comment) => {
                  <div className="post detailedPost" key={comment._id}>
                    <div>
                      <span>{comment.author.username}</span>
                      <span>{comment.date}</span>
                    </div>
                    <div>{comment.body}</div>
                  </div>;
                })}
              </>
            )}
          </section>
        </>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Post is private or doesn&apos;t exist</p>
      )}
    </main>
  );
}

export default Post;
