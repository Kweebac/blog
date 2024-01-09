const mongoose = require("mongoose");

module.exports = mongoose.model(
  "post",
  mongoose.Schema({
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true },
    date: { type: Date, default: Date.now, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    private: { type: Boolean, default: false, required: true },
  })
);
