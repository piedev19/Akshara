const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['News', 'Event', 'Achievement', 'Circular', 'Holiday'], default: 'News' },
  imageUrl: { type: String },
  publishedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  tags: [String],
  metaDescription: String,
}, { timestamps: true });

newsSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);
