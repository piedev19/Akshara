const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactConfirmation, sendContactNotificationToAdmin } = require('../utils/emailService');
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many messages sent, please wait 15 minutes.',
});

router.post('/', contactLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').isLength({ min: 10, max: 1000 }).withMessage('Message must be 10-1000 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const contact = await Contact.create(req.body);

    try {
      await sendContactConfirmation(contact);
      await sendContactNotificationToAdmin(contact);
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message received! We will get back to you within 24 hours.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
