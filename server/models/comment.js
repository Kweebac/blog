const mongoose = require("mongoose");

module.exports = mongoose.model(
  "comment",
  mongoose.Schema({
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true },
    date: { type: Date, default: Date.now, required: true },
    body: { type: String, required: true },
  })
);
