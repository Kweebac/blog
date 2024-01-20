const Comment = require("../models/Comment");
const Post = require("../models/Post");
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

  const commentId = req.params.commentId;
  await Comment.findByIdAndDelete(commentId).exec();

  res.json(true);
});

module.exports = router;
