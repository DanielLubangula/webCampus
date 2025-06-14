const mongoose = require('mongoose');

const actualiteSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Chemin de l'image
  title: { type: String, required: true }, // Titre de l'actualité
  description: { type: String, required: true }, // Description de l'actualité
  createdAt: { type: Date, default: Date.now }, // Date de création
});

module.exports = mongoose.model('Actualite', actualiteSchema);