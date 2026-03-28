const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'admin', email },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '1d' }
  );

  res.json({ token });
});

module.exports = router;