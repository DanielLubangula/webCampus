const mongoose = require('mongoose');

const tpSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titre du TP
  description: { type: String, required: true }, // Description du TP
  promotion: { type: String, required: true }, // Promotion associée
  file: { type: String }, // Chemin du fichier TP (facultatif)
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Enseignant qui a publié le TP
  createdAt: { type: Date, default: Date.now }, // Date de publication
  faculty : {
    
  },
  level: { // Niveau d'études (ex : "L2")
    type: String,
    required: true,
    enum: ['G1', 'G2', 'L1', 'L2', 'L3', 'M1', 'M2'], // Liste des niveaux possibles
  },
});

module.exports = mongoose.model('TP', tpSchema);