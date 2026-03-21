import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { Send, CheckCircle } from 'lucide-react';
import { admissionAPI } from '../../utils/api';
import './QuickAdmission.css';

const CLASSES = ['Nursery','LKG','UKG','Class 1','Class 2','Class 3','Class 4','Class 5',
                 'Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];

export default function QuickAdmission() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [form, setForm] = useState({ studentName: '', fatherName: '', motherName: '', primaryContact: '', email: '', classAppliedFor: '', dateOfBirth: '', gender: '', 'address.city': '', 'address.state': '', 'address.street': '', 'address.pincode': '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        address: {
          street: form['address.street'] || 'To be provided',
          city: form['address.city'],
          state: form['address.state'],
          pincode: form['address.pincode'] || '000000',
        },
      };
      const res = await admissionAPI.submit(payload);
      setSuccess(res.applicationNumber);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="quick-admission section" id="admissions-quick">
      <div className="quick-admission__bg" />
      <div className="container">
        <div ref={ref} className="quick-admission__layout">
          {/* Left content */}
          <motion.div
            className="quick-admission__left"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Admissions Open</span>
            <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>
              Secure Your Child's Seat for <span style={{ color: 'var(--gold)' }}>2026–27</span>
            </h2>
            <div className="gold-divider gold-divider--left" />
            <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 13, fontSize: '1.05rem' }}>
              Join the Akshara family. Fill in the quick form to begin your application — it takes just 2 minutes.
            </p>
            <ul className="quick-admission__checklist">
              {['Online & spot admissions available','Instant application number via email','Track your application status anytime','Transport & hostel option in same form'].map((item, i) => (
                <li key={i}><CheckCircle size={18} color="var(--gold)" /> {item}</li>
              ))}
            </ul>
            <div className="quick-admission__contact-box">
              <div><strong>Call our Admissions Desk</strong><br />+91 94948 17676 | +91 94948 17575</div>
              <div><strong>Email</strong><br />aksharaschoolkhankapur@gmail.com</div>
              <div><strong>Office Hours</strong><br />Mon–Fri 8AM–5PM, Sat 9AM–1PM</div>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            className="quick-admission__form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {success ? (
              <div className="quick-admission__success">
                <div className="quick-admission__success-icon"><CheckCircle size={48} color="var(--success)" /></div>
                <h3>Application Submitted!</h3>
                <p>Your application number is:</p>
                <div className="quick-admission__app-number">{success}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
                  A confirmation email has been sent to your email address. Our team will contact you within 48 hours.
                </p>
                <Link to="/admission-status" className="btn btn-outline" style={{ marginTop: 20 }}>
                  Track Application Status
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quick-admission__form">
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 20, fontSize: '1.4rem' }}>
                  Quick Application Form
                </h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Student Name <span className="required">*</span></label>
                    <input className="form-control" name="studentName" value={form.studentName} onChange={handleChange} required placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Class Applying For <span className="required">*</span></label>
                    <select className="form-control" name="classAppliedFor" value={form.classAppliedFor} onChange={handleChange} required>
                      <option value="">Select Class</option>
                      {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth <span className="required">*</span></label>
                    <input type="date" className="form-control" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender <span className="required">*</span></label>
                    <select className="form-control" name="gender" value={form.gender} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Father's Name <span className="required">*</span></label>
                    <input className="form-control" name="fatherName" value={form.fatherName} onChange={handleChange} required placeholder="Father's full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mother's Name <span className="required">*</span></label>
                    <input className="form-control" name="motherName" value={form.motherName} onChange={handleChange} required placeholder="Mother's full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number <span className="required">*</span></label>
                    <input className="form-control" name="primaryContact" value={form.primaryContact} onChange={handleChange} required placeholder="10-digit mobile" maxLength={10} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City <span className="required">*</span></label>
                    <input className="form-control" name="address.city" value={form['address.city']} onChange={handleChange} required placeholder="City" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State <span className="required">*</span></label>
                    <input className="form-control" name="address.state" value={form['address.state']} onChange={handleChange} required placeholder="State" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
                  {loading ? 'Submitting...' : <><Send size={16} /> Submit Application</>}
                </button>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
                  Need more options? <Link to="/admissions" style={{ color: 'var(--navy-mid)', fontWeight: 600 }}>Full Application Form →</Link>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
