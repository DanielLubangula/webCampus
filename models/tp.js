// models/TP.js
const mongoose = require('mongoose');

const tpSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  deadline: { type: Date, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TP', tpSchema);
