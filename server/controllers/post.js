const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

router.get("/", async (req, res) => {
  const posts = await Post.find({ private: false }).populate("author").exec();

  res.send(posts);
});
router.post("/", [
  body("title")
    .escape()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Title must be at least 8 characters"),
  body("body")
    .escape()
    .trim()
    .isLength({ min: 100 })
    .withMessage("Body must be at least 100 characters"),

  async (req, res) => {
    const newPost = new Post({
      author: "659457d9ce49300b6d540b5c", // set to logged in user
      title: req.body.title,
      body: req.body.body,
      private: req.body.private, // if on change to true, else false
    });

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await newPost.save();
      res.redirect(`/posts/${newPost._id}`);
    } else res.send(newPost);
  },
]);

router.get("/:postId", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId, private: false })
    .populate("author")
    .exec();

  res.send(post);
});
router.put("/:postId", [
  body("title")
    .escape()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Title must be at least 8 characters"),
  body("body")
    .escape()
    .trim()
    .isLength({ min: 100 })
    .withMessage("Body must be at least 100 characters"),

  async (req, res) => {
    const newPost = {
      author: "659457d9ce49300b6d540b5c", // set to logged in user
      title: req.body.title,
      body: req.body.body,
      private: req.body.private, // if on change to true, else false
      _id: req.params.postId,
    };

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Post.findOneAndReplace({ _id: req.params.postId }, newPost);
      res.redirect(`/posts/${newPost._id}`);
    } else res.send(newPost);
  },
]);
router.delete("/:postId", async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId);

  res.redirect("/posts");
});

module.exports = router;
