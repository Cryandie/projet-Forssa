const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    rating: { type: Number },
  },
  { timeStamp: true }
);
module.exports = mongoose.model("Feedback", FeedbackSchema);
