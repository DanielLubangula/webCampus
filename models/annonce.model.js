const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titre de l'annonce
  description: { type: String, required: true }, // Description de l'annonce
  publishedAt: { type: Date, default: Date.now }, // Date de publication
});

module.exports = mongoose.model('Annonce', annonceSchema);