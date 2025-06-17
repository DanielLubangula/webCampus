// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { // Titre du cours
    type: String,
    required: true,
    trim: true,
  },
  description: { // Description du cours
    type: String,
    trim: true,
  },
  credits: { // Nombre de crédits du cours
    type: Number,
    required: true,
  },
  promotion: { // Référence à la promotion associée
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promotion",
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
