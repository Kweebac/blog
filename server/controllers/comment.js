const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { body } = require("express-validator");

const router = require("express").Router();

router.post("/", body("body").escape().trim(), async (req, res) => {
  const newComment = await Comment.create({
    author: req.user._id,
    body: req.body.body,
  });

  const post = await Post.findById(req.body.postId).exec();
  post.comments.unshift(newComment._id);
  await post.save();

  res.end();
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  await Comment.findByIdAndDelete(commentId).exec();

  res.send();
});

module.exports = router;
