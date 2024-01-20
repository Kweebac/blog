const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { checkNotAuthenticated, checkAuthenticated } = require("../passport");
const router = require("express").Router();

router.get("/register", checkNotAuthenticated);
router.post(
  "/register",
  body("username")
    .escape()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isAlphanumeric()
    .withMessage("Username can only have letters or numbers"),
  body("email")
    .escape()
    .trim()
    .custom(async (value) => {
      const userExists = await User.find({ email: value }).exec();
      if (userExists.length) throw new Error("Email already exists");
    }),
  body("password")
    .escape()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        await newUser.save();
        res.json(true);
      } else {
        res.json(errors.array());
      }
    } catch (err) {
      res.json([]);
    }
  }
);

router.get("/login", checkNotAuthenticated, (req, res, next) => {
  if (req.session.messages) {
    const errorMessages = req.session.messages;
    res.json(errorMessages[errorMessages.length - 1]);
  } else next();
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "http://localhost:5173/posts",
    failureRedirect: "http://localhost:5173/login",
    failureMessage: true,
  })
);

router.get("/logout", checkAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) next(err);
    else res.json(true);
  });
});

router.get("/isAuthenticated", (req, res) => {
  if (req.isAuthenticated()) res.json(true);
  else res.json(false);
});

module.exports = router;
