// models/Deliberation.js
const mongoose = require("mongoose");

const deliberationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },// 	Étudiant concerné par la délibération
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Cours concerné
  tpNote: Number,
  examNote: Number,
  finalNote: Number,
});

module.exports = mongoose.model("Deliberation", deliberationSchema);
