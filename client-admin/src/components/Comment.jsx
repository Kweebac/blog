import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Comment({ comment, handleClick }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    (async () => {
      let res = await fetch("http://localhost:5000/api/getUser", {
        credentials: "include",
      });
      res = await res.json();
      if (res) setUser(res);
    })();
  });

  return (
    <div className="comment detailedPost" key={comment._id}>
      <div className="content">
        <div>
          <span>{comment.author.username}</span>
          <span>{comment.date}</span>
        </div>
        <div>{comment.body}</div>
      </div>
      <svg
        onClick={() => handleClick(comment)}
        className="delete"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title>delete</title>
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      </svg>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  handleClick: PropTypes.func,
};

export default Comment;
