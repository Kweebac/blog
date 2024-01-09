import { useEffect, useState } from "react";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/api/posts");
      const posts = await response.json();

      // convert string to formatted date
      for (const post of posts) {
        const formattedDate = new Date(post.date);
        const year = formattedDate.getFullYear();
        let month = formattedDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let day = formattedDate.getDate();
        if (day < 10) day = "0" + day;

        post.date = `${year}/${month}/${day}`;
      }

      setPosts(posts);
    })();
  }, []);

  return (
    <main>
      <h1>Posts</h1>
      <section className="posts">
        {posts ? (
          posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
}

export default Posts;
