const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { checkNotAuthenticated, checkAuthenticated, checkAdmin } = require("../passport");
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

router.get("/login", checkNotAuthenticated, (req, res) => res.json(true));
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/success",
    failureRedirect: "/api/failure",
    failureMessage: true,
  })
);
router.get("/success", (req, res) =>
  res.json({
    error: false,
    loggedIn: true,
  })
);
router.get("/failure", (req, res) =>
  res.json({
    error: req.session.messages[req.session.messages.length - 1],
    loggedIn: false,
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

router.get("/getUser", (req, res) => {
  if (req.isAuthenticated()) res.json(req.user);
  else res.json(false);
});

router.get("/checkAdmin", checkAdmin, (req, res) => res.json(true));

module.exports = router;
