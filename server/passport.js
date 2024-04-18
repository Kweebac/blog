const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).exec();

      if (user === null) done(null, false, { message: "No user with that email" });
      else if (!(await bcrypt.compare(password, user.password)))
        done(null, false, { message: "Password did not match" });
      else done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.json(false);
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) res.json(false);
  else next();
}

function checkAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else res.json(false);
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  checkAdmin,
};
