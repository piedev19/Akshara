import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, FileText, XCircle, AlertCircle, Star } from 'lucide-react';
import { admissionAPI } from '../utils/api';
import './AdmissionStatus.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

const STATUS_CONFIG = {
  Pending:       { icon: <Clock size={28} />,       color: '#e67e22', bg: '#fef3e2', label: 'Pending Review', desc: 'Your application has been received and is in the queue for review. Expect a response within 48 working hours.' },
  'Under Review':{ icon: <FileText size={28} />,    color: '#3498db', bg: '#e8f4fd', label: 'Under Review',   desc: 'Our admissions team is currently reviewing your application. You may receive a call from us shortly.' },
  Shortlisted:   { icon: <Star size={28} />,        color: '#9b59b6', bg: '#f5eef8', label: 'Shortlisted!',   desc: 'Congratulations! Your application has been shortlisted. Please check your email for the next steps and document verification schedule.' },
  Admitted:      { icon: <CheckCircle size={28} />, color: '#2d7a3a', bg: '#e8f5ea', label: 'Admitted! 🎉',   desc: 'Congratulations! Your child has been admitted. Please complete the fee payment and document submission within 7 days to confirm the seat.' },
  Waitlisted:    { icon: <AlertCircle size={28} />, color: '#7f8c8d', bg: '#f2f3f4', label: 'Waitlisted',     desc: 'Your application is on the waitlist. You will be notified as soon as a seat becomes available. We appreciate your patience.' },
  Rejected:      { icon: <XCircle size={28} />,     color: '#c0392b', bg: '#fde8e6', label: 'Not Selected',   desc: 'Unfortunately, we are unable to offer admission at this time due to limited seats. Please contact the admissions office for further guidance.' },
};

export default function AdmissionStatus() {
  const [appNo, setAppNo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkStatus = async (e) => {
    e.preventDefault();
    if (!appNo.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await admissionAPI.checkStatus(appNo.trim().toUpperCase());
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Application not found. Please check the application number.');
    } finally {
      setLoading(false);
    }
  };

  const config = result ? STATUS_CONFIG[result.status] : null;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Check Admission Status | Akshara Hgh School</title>
        <meta name="description" content="Track your child's admission application status at Akshara Hgh School using your application number." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › Admissions › <span>Track Application</span></p>
          <h1>Track Your Application</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, marginTop: 12 }}>
            Enter your application number below to check the current status of your admission application.
          </p>
        </div>
      </div>

      <section className="section section--cream">
        <div className="container" style={{ maxWidth: 680 }}>
          {/* Search form */}
          <motion.div
            className="status__search-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="status__search-icon">
              <Search size={32} />
            </div>
            <h2>Application Status Tracker</h2>
            <p>Your application number was emailed to you when you submitted the form. It follows the format: <strong>ADM20260001</strong></p>

            <form onSubmit={checkStatus} className="status__form">
              <div className="status__input-group">
                <input
                  className="form-control status__input"
                  value={appNo}
                  onChange={e => setAppNo(e.target.value.toUpperCase())}
                  placeholder="Enter Application Number (e.g. ADM20260001)"
                  maxLength={14}
                />
                <button type="submit" className="btn btn-primary" disabled={loading || !appNo.trim()}>
                  {loading ? 'Checking...' : 'Check Status'}
                </button>
              </div>
            </form>

            {error && (
              <motion.div
                className="status__error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <XCircle size={18} />
                <p>{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Result card */}
          {result && config && (
            <motion.div
              className="status__result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ borderTop: `4px solid ${config.color}` }}
            >
              {/* Status badge */}
              <div className="status__badge" style={{ background: config.bg, color: config.color }}>
                {config.icon}
                <span>{config.label}</span>
              </div>

              {/* Application details */}
              <div className="status__details">
                <div className="status__detail-row">
                  <span>Application No.</span>
                  <strong style={{ fontFamily: 'monospace', letterSpacing: '2px', color: 'var(--navy)' }}>
                    {result.applicationNumber}
                  </strong>
                </div>
                <div className="status__detail-row">
                  <span>Student Name</span>
                  <strong>{result.studentName}</strong>
                </div>
                <div className="status__detail-row">
                  <span>Class Applied</span>
                  <strong>{result.classAppliedFor}</strong>
                </div>
                <div className="status__detail-row">
                  <span>Academic Year</span>
                  <strong>{result.academicYear}</strong>
                </div>
                <div className="status__detail-row">
                  <span>Applied On</span>
                  <strong>{new Date(result.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                </div>
                <div className="status__detail-row status__detail-row--status">
                  <span>Current Status</span>
                  <strong style={{ color: config.color }}>{result.status}</strong>
                </div>
              </div>

              {/* Status description */}
              <div className="status__desc" style={{ background: config.bg, borderLeft: `4px solid ${config.color}` }}>
                <p>{config.desc}</p>
              </div>

              {/* Timeline */}
              <div className="status__timeline">
                <h4>Application Journey</h4>
                <div className="status__steps">
                  {['Pending', 'Under Review', 'Shortlisted', 'Admitted'].map((step, i) => {
                    const order = ['Pending', 'Under Review', 'Shortlisted', 'Admitted', 'Waitlisted'];
                    const currentIdx = order.indexOf(result.status);
                    const stepIdx = order.indexOf(step);
                    const isDone = stepIdx < currentIdx || result.status === step;
                    const isCurrent = result.status === step;
                    return (
                      <div key={step} className={`status__step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                        <div className="status__step-dot">
                          {isDone ? '✓' : i + 1}
                        </div>
                        <div className="status__step-label">{step}</div>
                        {i < 3 && <div className={`status__step-line ${isDone && stepIdx < currentIdx ? 'done' : ''}`} />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="status__help">
                <p>Need help? Contact our Admissions Helpdesk:</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
                  <a href="tel:+919876543210" className="btn btn-primary btn-sm">📞 +91 9494817676</a>
                  <a href="mailto:admissions@akshara.edu.in" className="btn btn-outline btn-sm">✉️ Email Us</a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info box */}
          {!result && !error && (
            <div className="status__info-box">
              <h4>How to find your Application Number?</h4>
              <ul>
                <li>📧 Check the confirmation email sent to your registered email address</li>
                <li>📱 Check the SMS sent to your registered mobile number</li>
                <li>📞 Call our admissions desk: <a href="tel:+919876543210">+91 9494817676</a></li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
