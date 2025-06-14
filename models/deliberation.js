// models/Deliberation.js
const mongoose = require("mongoose");

const deliberationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Étudiant concerné
  course: { type: String, required: true }, // UE ou cours (ex : "Mathématiques")
  grade: { type: Number, required: true }, // Note obtenue (ex : 14/20)
  credit: { type: Number, required: true }, // Crédit associé au cours
  status: { type: String, required: true, enum: ["Validé", "Échec"] }, // Statut (ex : "Validé", "Échec")
});

module.exports = mongoose.model("Deliberation", deliberationSchema);
