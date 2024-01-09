import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <Link to={`/props/${post._id}`}>
      <div className="post" key={post._id}>
        <div>
          <span>{post.author.username}</span>
          <span>{post.date}</span>
        </div>
        <h3>{post.title}</h3>
      </div>
    </Link>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
