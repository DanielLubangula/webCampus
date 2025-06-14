const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  promotion: { // Référence à la promotion
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
    required: true
  },
  level: { // Ajout du champ pour le niveau d'études
    type: String,
    required: true,
    enum: ['G1', 'G2', 'L1', 'L2', 'L3', 'M1', 'M2'], // Liste des niveaux possibles
    default: 'G1' // Niveau par défaut
  }
}, { timestamps: true });

// Hashage du mot de passe avant enregistrement
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Student', studentSchema);
