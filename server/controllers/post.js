const router = require("express").Router();
const { body, validationResult, check } = require("express-validator");
const Post = require("../models/Post");
const { checkAdmin } = require("../passport");

router.get("/", async (req, res) => {
  const posts = await Post.find({ private: false }, "author date title")
    .populate("author")
    .exec();
  res.send(posts);
});
router.post(
  "/",
  checkAdmin,
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
    let { title, body, private } = req.body;
    private = private === "on" ? true : false;

    const newPost = new Post({
      author: req.user._id,
      title,
      body,
      private,
    });

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await newPost.save();
      res.json(`/posts/${newPost._id}`);
    } else res.json(errors.array());
  }
);

router.get("/private", checkAdmin, async (req, res) => {
  const posts = await Post.find({}, "author date title private").populate("author").exec();
  res.json(posts);
});

router.get("/:postId", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId, private: false })
    .populate("author")
    .populate({ path: "comments", populate: "author" })
    .exec();

  res.send(post);
});

router.put(
  "/:postId",
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
      author: req.user._id,
      title: req.body.title,
      body: req.body.body,
      private: req.body.private, // if on change to true, else false
      _id: req.params.postId,
    });

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Post.findOneAndReplace({ _id: req.params.postId }, newPost);
      res.redirect(`/posts/${newPost._id}`);
    } else res.send(newPost);
  }
);
router.delete("/:postId", async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId);

  res.redirect("/posts");
});

module.exports = router;
