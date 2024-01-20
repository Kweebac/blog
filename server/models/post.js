const mongoose = require("mongoose");

function getFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let day = currentDate.getDate();
  if (day < 10) day = "0" + day;

  return `${year}/${month}/${day}`;
}

module.exports = mongoose.model(
  "post",
  mongoose.Schema({
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true },
    date: { type: String, default: getFormattedDate, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "comment" }],
    private: { type: Boolean, default: false, required: true },
  })
);
