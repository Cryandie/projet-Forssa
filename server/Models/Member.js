const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  // mobile: Number,
});

module.exports = Member = mongoose.model("Member", memberSchema);
