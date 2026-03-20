const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    const skip = (page - 1) * limit;
    const news = await News.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)).select('-content');
    const total = await News.countDocuments(filter);
    res.json({ success: true, data: news, total });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug, isPublished: true });
    if (!news) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
