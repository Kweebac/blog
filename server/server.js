if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const indexRouter = require("./controllers/index");
const postRouter = require("./controllers/post");
const commentRouter = require("./controllers/comment");
const passport = require("passport");
const app = express();
const session = require("express-session");

require("./passport");

mongoose.connect(process.env.MONGO_PRIVATE_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", indexRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.listen(5000);
