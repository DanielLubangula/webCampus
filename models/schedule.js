const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  jour: { // Jour de l'horaire (ex : "Lundi")
    type: String,
    required: true,
    trim: true,
  },
  heure_debut: { // Heure de début (ex : "08:00")
    type: String,
    required: true,
  },
  heure_fin: { // Heure de fin (ex : "10:00")
    type: String,
    required: true,
  },
  salle: { // Salle où le cours est donné (ex : "B201")
    type: String,
    required: true,
    trim: true,
  },
  cours: { // Référence au modèle Course
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
});

module.exports = mongoose.model('Schedule', scheduleSchema);