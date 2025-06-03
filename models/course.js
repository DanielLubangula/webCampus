// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  credits: Number,
});

module.exports = mongoose.model("Course", courseSchema);
