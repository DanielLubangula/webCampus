// models/Schedule.js
// Horaire
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  day: String, // Lundi, Mardi...
  startTime: String, // "08:00"
  endTime: String,
  room: String,
});

module.exports = mongoose.model("Schedule", scheduleSchema);

