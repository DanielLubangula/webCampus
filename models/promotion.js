// models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // ex: "G1 Info"
  academicYear: { type: String, required: true }, // ex: "2024-2025"
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

module.exports = mongoose.model("Promotion", promotionSchema);
