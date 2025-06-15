// models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({

  name: { // Domaine d'études (ex : "Informatique")
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model('Promotion', promotionSchema);
