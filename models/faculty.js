const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  nom: { // Nom de la faculté (ex : "Sciences Informatiques")
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model('Faculty', facultySchema);