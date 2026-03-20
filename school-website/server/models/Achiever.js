const mongoose = require('mongoose');

const achieverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  achievement: { type: String, required: true },
  category: { type: String, enum: ['Academic', 'Sports', 'Arts', 'Cultural', 'Science', 'Other'], default: 'Academic' },
  year: { type: Number, default: new Date().getFullYear() },
  rank: { type: String },
  marks: { type: String },
  board: { type: String },
  description: { type: String },
  photoUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Achiever', achieverSchema);
