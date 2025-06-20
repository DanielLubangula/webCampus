// models/Deliberation.js
const mongoose = require("mongoose");

const deliberationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Étudiant concerné
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, 
  grade: { type: Number, required: true }, // Note obtenue (ex : 14/20)
});

module.exports = mongoose.model("Deliberation", deliberationSchema);
