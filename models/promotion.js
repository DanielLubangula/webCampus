// models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  nom: { // Nom de la promotion (ex : "*L2")
    type: String,
    required: true,
    trim: true,
  },
  section: { // Section de la promotion (ex : "Informatique")
    type: String,
    required: true,
    trim: true,
  },
  faculty: { // Référence à la faculté
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
});

module.exports = mongoose.model('Promotion', promotionSchema);
