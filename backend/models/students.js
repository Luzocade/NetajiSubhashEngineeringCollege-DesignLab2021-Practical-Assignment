const mongoose = require("mongoose");

const schema = mongoose.Schema({
  studname: String,
  dpic: String,
  email: String,
  phone: String,
  language: String,
  qualification: String,
  percentage: String,
  projects: String,
});

module.exports = mongoose.model("students", schema);
