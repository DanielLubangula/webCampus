const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  promotion: { // Référence à la promotion
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
    required: true,
    unique: true // Une promotion ne peut avoir qu'un seul horaire
  },
  level: { // Niveau d'études
    type: String,
    required: true,
    enum: ['G1', 'G2', 'L1', 'L2', 'L3', 'M1', 'M2'], // Liste des niveaux possibles
  },
  courses: [ // Liste des cours dans l'horaire
    {
      day: { type: String, required: true }, // Jour du cours (ex : Lundi)
      time: { type: String, required: true }, // Heure du cours (ex : 08:00 - 10:00)
      title: { type: String, required: true }, // Titre du cours
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Enseignant responsable
      room: { type: String, required: true }, // Salle du cours
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);