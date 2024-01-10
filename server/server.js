if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const indexRouter = require("./controllers/index");
const postRouter = require("./controllers/post");

mongoose.connect(process.env.MONGO_PRIVATE_URL);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", indexRouter);
app.use("/api/posts", postRouter);

app.listen(5000);
