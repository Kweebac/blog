import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

  return (
    <>
      {post ? (
        <div className="post detailedPost" key={post._id}>
          <div>
            <span>{post.author.username}</span>
            <span>{post.date}</span>
          </div>
          <h3>{post.title}</h3>
          <div>{post.body}</div>
        </div>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Post is private or doesn&apos;t exist</p>
      )}
      <Link to="/posts">All posts</Link>
    </>
  );
}

export default Post;
