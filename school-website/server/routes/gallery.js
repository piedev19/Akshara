const express = require('express');
const router = express.Router();

// Placeholder gallery route - images stored in uploads folder
router.get('/', (req, res) => {
  const gallery = [
    { id: 1, category: 'Campus', title: 'Main Building', url: '/uploads/gallery/campus1.jpg' },
    { id: 2, category: 'Sports', title: 'Sports Day 2025', url: '/uploads/gallery/sports1.jpg' },
    { id: 3, category: 'Events', title: 'Annual Day', url: '/uploads/gallery/event1.jpg' },
    { id: 4, category: 'Labs', title: 'Science Lab', url: '/uploads/gallery/lab1.jpg' },
    { id: 5, category: 'Library', title: 'Digital Library', url: '/uploads/gallery/library1.jpg' },
    { id: 6, category: 'Hostel', title: 'Hostel Block', url: '/uploads/gallery/hostel1.jpg' },
  ];
  res.json({ success: true, data: gallery });
});

module.exports = router;
