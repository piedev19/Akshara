const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admission = require('../models/Admission');
const Contact = require('../models/Contact');
const { sendStatusUpdateEmail } = require('../utils/emailService');

// Simple admin auth middleware
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  // In production, compare hashed passwords from DB
  const isMatch = password === process.env.ADMIN_PASSWORD;
  if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ success: true, token });
});

// Get all admissions
router.get('/admissions', adminAuth, async (req, res) => {
  try {
    const { status, classAppliedFor, page = 1, limit = 20, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (classAppliedFor) filter.classAppliedFor = classAppliedFor;
    if (search) filter.$or = [
      { studentName: { $regex: search, $options: 'i' } },
      { applicationNumber: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
    const skip = (page - 1) * limit;
    const admissions = await Admission.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    const total = await Admission.countDocuments(filter);
    res.json({ success: true, data: admissions, total });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update admission status
router.patch('/admissions/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status, notes, reviewedAt: new Date() },
      { new: true }
    );
    if (!admission) return res.status(404).json({ success: false, message: 'Not found' });

    // Send status update email
    try {
      await sendStatusUpdateEmail(admission);
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }

    res.json({ success: true, data: admission });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalApplications = await Admission.countDocuments();
    const pendingApplications = await Admission.countDocuments({ status: 'Pending' });
    const admittedStudents = await Admission.countDocuments({ status: 'Admitted' });
    const newContacts = await Contact.countDocuments({ status: 'New' });

    const byClass = await Admission.aggregate([
      { $group: { _id: '$classAppliedFor', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: { totalApplications, pendingApplications, admittedStudents, newContacts, byClass }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
