const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = require("express").Router();

router.post(
  "/register",
  body("username")
    .escape()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isAlphanumeric()
    .withMessage("Username can only have letters or numbers"),
  body("email").escape().trim(),
  body("password")
    .escape()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
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
    });
  }
);

module.exports = router;
