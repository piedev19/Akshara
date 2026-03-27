const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Admission = require('../models/Admission');
const { sendAdmissionConfirmation, sendAdmissionNotificationToAdmin } = require('../utils/emailService');
const rateLimit = require('express-rate-limit');

const admissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many applications from this IP, please try again after an hour.',
});

const validateAdmission = [
  body('studentName').trim().notEmpty().withMessage('Student name is required').isLength({ min: 2, max: 100 }),
  body('dateOfBirth').isDate().withMessage('Valid date of birth is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender is required'),
  body('classAppliedFor').notEmpty().withMessage('Class applied for is required'),
  body('fatherName').trim().notEmpty().withMessage('Father name is required'),
  body('motherName').trim().notEmpty().withMessage('Mother name is required'),
  body('primaryContact').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit mobile number required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('address.street').notEmpty().withMessage('Street address is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.pincode').matches(/^\d{6}$/).withMessage('Valid 6-digit pincode required'),
];

// POST - Submit new admission application
router.post('/', admissionLimiter, validateAdmission, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    // Check for duplicate application (same student + class + year)
    const existing = await Admission.findOne({
      studentName: req.body.studentName,
      email: req.body.email,
      classAppliedFor: req.body.classAppliedFor,
      academicYear: req.body.academicYear || '2026-27',
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `An application already exists for this student. Application Number: ${existing.applicationNumber}`,
        applicationNumber: existing.applicationNumber,
      });
    }

    const admission = await Admission.create(req.body);

    // Send emails (non-blocking)
    try {
      await sendAdmissionConfirmation(admission);
      await sendAdmissionNotificationToAdmin(admission);
      admission.confirmationEmailSent = true;
      await admission.save();
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will contact you within 48 hours.',
      applicationNumber: admission.applicationNumber,
      data: {
        applicationNumber: admission.applicationNumber,
        studentName: admission.studentName,
        classAppliedFor: admission.classAppliedFor,
        status: admission.status,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET - Check application status
router.get('/status/:applicationNumber', async (req, res) => {
  try {
    const admission = await Admission.findOne({
      applicationNumber: req.params.applicationNumber.toUpperCase(),
    }).select('-notes -reviewedBy -documents');

    if (!admission) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({
      success: true,
      data: {
        applicationNumber: admission.applicationNumber,
        studentName: admission.studentName,
        classAppliedFor: admission.classAppliedFor,
        status: admission.status,
        submittedAt: admission.createdAt,
        academicYear: admission.academicYear,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET - Get available seats (public)
router.get('/seats', async (req, res) => {
  try {
    const classes = ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4',
                     'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
    const totalSeats = 40;

    const admittedCounts = await Admission.aggregate([
      { $match: { status: 'Admitted', academicYear: '2026-27' } },
      { $group: { _id: '$classAppliedFor', count: { $sum: 1 } } },
    ]);

    const seatMap = {};
    admittedCounts.forEach(item => { seatMap[item._id] = item.count; });

    const seats = classes.map(cls => ({
      class: cls,
      total: totalSeats,
      filled: seatMap[cls] || 0,
      available: totalSeats - (seatMap[cls] || 0),
    }));

    res.json({ success: true, data: seats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Admission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Admission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
