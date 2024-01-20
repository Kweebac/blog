const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { body } = require("express-validator");

const router = require("express").Router();

router.post("/", body("body").escape().trim(), async (req, res) => {
  console.log("Started");
  console.log(req.user);
  const newComment = await Comment.create({
    author: req.user._id,
    body: req.body.body,
  });

  await Post.findByIdAndUpdate(req.postId, {
    $push: {
      comments: newComment,
    },
  }).exec();
});

module.exports = router;
