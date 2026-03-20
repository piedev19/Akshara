const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  // Student Details
  studentName: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  classAppliedFor: {
    type: String,
    enum: ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
           'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    required: true
  },
  previousSchool: { type: String, trim: true },
  previousClass: { type: String },
  academicYear: { type: String, default: '2026-27' },

  // Parent/Guardian Details
  fatherName: { type: String, required: true, trim: true },
  motherName: { type: String, required: true, trim: true },
  guardianName: { type: String, trim: true },
  primaryContact: { type: String, required: true },
  alternateContact: { type: String },
  email: { type: String, required: true, lowercase: true },

  // Address
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },

  // Facilities Required
  transportRequired: { type: Boolean, default: false },
  transportRoute: { type: String },
  hostelRequired: { type: Boolean, default: false },
  hostelType: { type: String, enum: ['Boys', 'Girls', ''], default: '' },

  // Medical Info
  medicalConditions: { type: String },
  bloodGroup: { type: String },

  // Application Status
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Shortlisted', 'Admitted', 'Waitlisted', 'Rejected'],
    default: 'Pending'
  },
  applicationNumber: { type: String, unique: true },
  admissionType: { type: String, enum: ['Spot', 'Regular', 'Online'], default: 'Online' },

  // Documents
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],

  // Internal
  notes: { type: String },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  reviewedAt: Date,

  // Email tracking
  confirmationEmailSent: { type: Boolean, default: false },
  statusUpdateEmailSent: { type: Boolean, default: false },
}, { timestamps: true });

// Auto-generate application number
admissionSchema.pre('save', async function(next) {
  if (!this.applicationNumber) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.applicationNumber = `ADM${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Admission', admissionSchema);
