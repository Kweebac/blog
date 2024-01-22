const mongoose = require("mongoose");

module.exports = mongoose.model(
  "user",
  mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  })
);
