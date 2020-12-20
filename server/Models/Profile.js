const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },

  pseudo: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },
  num_tel: {
    type: Number,
  },
  lieu: {
    type: String,
  },
  fonction: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
