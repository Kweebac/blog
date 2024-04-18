const Comment = require("../models/comment");
const Post = require("../models/post");
const { body } = require("express-validator");

const router = require("express").Router();

router.post("/", body("body").trim(), async (req, res) => {
  if (req.user === undefined) return res.json(false);

  const newComment = await Comment.create({
    author: req.user._id,
    body: req.body.body,
  });

  const post = await Post.findById(req.body.postId).exec();
  post.comments.unshift(newComment._id);
  await post.save();

  res.json(true);
});

router.delete("/:commentId", async (req, res) => {
  if (req.user === undefined) return res.json(false);

  // delete comment
  const commentId = req.params.commentId;
  await Comment.findByIdAndDelete(commentId).exec();

  // delete comment from post comments
  await Post.findOneAndUpdate(
    { comments: commentId },
    { $pull: { comments: commentId } }
  ).exec();

  res.json(true);
});

module.exports = router;
