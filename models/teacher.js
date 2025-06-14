// models/Teacher.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Référence au modèle Course
});

// Hash le mot de passe avant sauvegarde
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Teacher', teacherSchema);
