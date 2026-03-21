const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
  return info;
};

const admissionConfirmationTemplate = (admission) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Georgia, serif; color: #1a1a1a; margin: 0; padding: 0; background: #f5f0e8; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; }
    .header { background: linear-gradient(135deg, #1a3a5c 0%, #0d2137 100%); padding: 40px; text-align: center; }
    .header h1 { color: #d4af37; font-size: 13px; margin: 0; letter-spacing: 2px; }
    .header p { color: #a0c4e8; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 40px; }
    .application-box { background: #f5f0e8; border-left: 4px solid #d4af37; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0; }
    .application-number { font-size: 13px; font-weight: bold; color: #1a3a5c; letter-spacing: 3px; }
    .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #e8e0d0; }
    .detail-label { width: 180px; color: #666; font-size: 14px; }
    .detail-value { font-weight: bold; color: #1a1a1a; font-size: 14px; }
    .steps { margin: 30px 0; }
    .step { display: flex; align-items: flex-start; margin: 16px 0; }
    .step-num { background: #d4af37; color: #1a3a5c; width: 13px; height: 13px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; flex-shrink: 0; margin-right: 16px; }
    .footer { background: #1a3a5c; padding: 30px; text-align: center; color: #a0c4e8; font-size: 13px; }
    .footer a { color: #d4af37; text-decoration: none; }
    .badge { display: inline-block; background: #d4f0d4; color: #1a5c1a; padding: 4px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Akshara High School</h1>
      <p>Excellence in Education Since 2013</p>
    </div>
    <div class="body">
      <p>Dear <strong>${admission.fatherName} & ${admission.motherName}</strong>,</p>
      <p>Thank you for choosing Akshara High School for <strong>${admission.studentName}</strong>. We have received your application for admission to <strong>${admission.classAppliedFor}</strong> for the academic year <strong>${admission.academicYear}</strong>.</p>
      
      <div class="application-box">
        <p style="margin:0 0 8px; color:#666; font-size:13px; text-transform:uppercase; letter-spacing:1px;">Your Application Number</p>
        <div class="application-number">${admission.applicationNumber}</div>
        <div class="badge">✓ Application Received</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Student Name</div>
        <div class="detail-value">${admission.studentName}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Class Applied</div>
        <div class="detail-value">${admission.classAppliedFor}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Submitted On</div>
        <div class="detail-value">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>
      ${admission.transportRequired ? `<div class="detail-row"><div class="detail-label">Transport</div><div class="detail-value">Requested - ${admission.transportRoute || 'To be assigned'}</div></div>` : ''}
      ${admission.hostelRequired ? `<div class="detail-row"><div class="detail-label">Hostel</div><div class="detail-value">Requested - ${admission.hostelType}</div></div>` : ''}

      <div class="steps">
        <p style="font-weight:bold; color:#1a3a5c; font-size:16px; margin-bottom:16px;">What Happens Next?</p>
        <div class="step"><div class="step-num">1</div><div>Our admissions team will review your application within <strong>48 working hours</strong>.</div></div>
        <div class="step"><div class="step-num">2</div><div>You will receive a call to schedule a <strong>student interaction session</strong> (for Classes 6-12).</div></div>
        <div class="step"><div class="step-num">3</div><div>Upon shortlisting, you will be invited for <strong>document verification</strong>.</div></div>
        <div class="step"><div class="step-num">4</div><div>Post-verification, the <strong>admission confirmation</strong> will be issued with fee details.</div></div>
      </div>

      <p>You can track your application status at <a href="${process.env.CLIENT_URL}/admission-status" style="color:#1a3a5c; font-weight:bold;">${process.env.CLIENT_URL}/admission-status</a> using your application number.</p>
      
      <p>For any queries, reach us at:<br>
      📞 +91 94948 17676| +91 94948 17575<br>
      ✉️ aksharaschoolkhankapur@gmail.com</p>
      
      <p>Warm regards,<br><strong>Admissions Office</strong><br>Akshara High School</p>
    </div>
    <div class="footer">
      <p>Akshara High School | Near KNR Garden,   Kankapur, Nirmal - 504101Kankapur, Nirmal - 504101</p>
      <p>Affiliated to BSET | School Code: 3604 | <a href="tel:+919876543210">+91 98765 43210</a></p>
    </div>
  </div>
</body>
</html>`;

const statusUpdateTemplate = (admission) => `
<html><body style="font-family:Georgia,serif;color:#1a1a1a;">
<div style="max-width:600px;margin:0 auto;background:#fff;">
  <div style="background:linear-gradient(135deg,#1a3a5c 0%,#0d2137 100%);padding:40px;text-align:center;">
    <h1 style="color:#d4af37;font-size:24px;margin:0;">APPLICATION STATUS UPDATE</h1>
    <p style="color:#a0c4e8;margin:8px 0 0;">Akshara High School</p>
  </div>
  <div style="padding:40px;">
    <p>Dear <strong>${admission.fatherName}</strong>,</p>
    <p>Your application <strong>${admission.applicationNumber}</strong> for <strong>${admission.studentName}</strong> has been updated.</p>
    <div style="background:#f5f0e8;border-left:4px solid #d4af37;padding:20px;margin:24px 0;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 8px;color:#666;font-size:13px;">Current Status</p>
      <p style="font-size:24px;font-weight:bold;color:#1a3a5c;margin:0;">${admission.status}</p>
    </div>
    ${admission.notes ? `<p><strong>Additional Information:</strong> ${admission.notes}</p>` : ''}
    <p>For queries, contact aksharaschoolkhankapur@gmail.com or call +91 98765 43210</p>
  </div>
</div>
</body></html>`;

exports.sendAdmissionConfirmation = async (admission) => {
  await sendEmail({
    to: admission.email,
    subject: `Application Received - ${admission.applicationNumber} | Akshara High School`,
    html: admissionConfirmationTemplate(admission),
  });
};

exports.sendAdmissionNotificationToAdmin = async (admission) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Admission Application: ${admission.studentName} - ${admission.classAppliedFor}`,
    html: `<p>New application received: <strong>${admission.applicationNumber}</strong><br>
    Student: ${admission.studentName}<br>Class: ${admission.classAppliedFor}<br>
    Contact: ${admission.primaryContact} | ${admission.email}</p>`,
  });
};

exports.sendContactConfirmation = async (contact) => {
  await sendEmail({
    to: contact.email,
    subject: `Message Received - Akshara High School`,
    html: `<p>Dear ${contact.name},<br><br>Thank you for contacting us. We have received your message regarding "<strong>${contact.subject}</strong>" and will get back to you within 24 hours.<br><br>Regards,<br>Akshara High School</p>`,
  });
};

exports.sendContactNotificationToAdmin = async (contact) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${contact.subject}`,
    html: `<p>From: ${contact.name} (${contact.email})<br>Phone: ${contact.phone || 'N/A'}<br>Subject: ${contact.subject}<br>Message: ${contact.message}</p>`,
  });
};

exports.sendStatusUpdateEmail = async (admission) => {
  await sendEmail({
    to: admission.email,
    subject: `Application Status Updated: ${admission.status} - ${admission.applicationNumber}`,
    html: statusUpdateTemplate(admission),
  });
};
