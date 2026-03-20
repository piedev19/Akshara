const cron = require('node-cron');
const Admission = require('../models/Admission');
const nodemailer = require('nodemailer');

// Every day at 9 AM - send reminder to pending applications older than 3 days
cron.schedule('0 9 * * *', async () => {
  console.log('⏰ Running daily admission reminder cron job...');
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const pendingOld = await Admission.find({
      status: 'Pending',
      createdAt: { $lte: threeDaysAgo },
      confirmationEmailSent: true,
    });
    console.log(`Found ${pendingOld.length} pending applications older than 3 days`);
    // In production, send follow-up emails here
  } catch (err) {
    console.error('Cron job error:', err.message);
  }
});

// Every Monday at 8 AM - send weekly admission summary to admin
cron.schedule('0 8 * * 1', async () => {
  console.log('📊 Running weekly admission summary...');
  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newApplications = await Admission.countDocuments({ createdAt: { $gte: weekAgo } });
    const admitted = await Admission.countDocuments({ status: 'Admitted', updatedAt: { $gte: weekAgo } });
    console.log(`Weekly summary: ${newApplications} new applications, ${admitted} admitted`);
    // Email admin weekly summary here
  } catch (err) {
    console.error('Weekly cron error:', err.message);
  }
});

console.log('✅ Cron jobs initialized');
