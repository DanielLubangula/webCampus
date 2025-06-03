// models/Assignment.js
// Modèle pour le tp
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  deadline: Date, // Date limite de soumission du TP
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },// Liste des soumissions des étudiants
      filePath: String,
      submittedAt: Date,
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);
