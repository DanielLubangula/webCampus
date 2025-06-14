const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Étudiant concerné
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Enseignant concerné (facultatif)
  type: { type: String, required: true }, // Type de réclamation (ex : "Note", "Absence", etc.)
  subject: { type: String, required: true }, // Objet de la réclamation
  message: { type: String, required: true }, // Message détaillé
  createdAt: { type: Date, default: Date.now }, // Date de création
});

module.exports = mongoose.model('Reclamation', reclamationSchema);