const express = require('express');
const router = express.Router();
const Achiever = require('../models/Achiever');

router.get('/', async (req, res) => {
  try {
    const { category, year, featured, limit = 20, page = 1 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (year) filter.year = Number(year);
    if (featured === 'true') filter.featured = true;

    const skip = (page - 1) * limit;
    const achievers = await Achiever.find(filter).sort({ order: 1, year: -1 }).skip(skip).limit(Number(limit));
    const total = await Achiever.countDocuments(filter);

    res.json({ success: true, data: achievers, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
