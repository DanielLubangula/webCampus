// models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  level: { // Niveau d'études (ex : "L2")
    type: String,
    required: true,
    enum: ['G1', 'G2', 'L1', 'L2', 'L3', 'M1', 'M2'], // Liste des niveaux possibles
  },
  name: { // Domaine d'études (ex : "Informatique")
    type: String,
    required: true,
    trim: true,
  },
  academicYear: { // Année académique (ex : "2024-2025")
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Promotion', promotionSchema);
