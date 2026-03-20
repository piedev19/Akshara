import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { admissionAPI } from '../utils/api';
import './Admissions.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const CLASSES = ['Nursery','LKG','UKG','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];
const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
const ROUTES = ['Route A – North Zone','Route B – South Zone','Route C – East Zone','Route D – West Zone','Route E – Central Zone'];

const STEPS = ['Student Info', 'Parent Info', 'Address', 'Facilities', 'Review'];

const initialForm = {
  studentName: '', dateOfBirth: '', gender: '', classAppliedFor: '', previousSchool: '', bloodGroup: '', medicalConditions: '',
  fatherName: '', motherName: '', primaryContact: '', alternateContact: '', email: '',
  'address.street': '', 'address.city': '', 'address.state': '', 'address.pincode': '',
  transportRequired: false, transportRoute: '', hostelRequired: false, hostelType: '',
  admissionType: 'Online',
};

export default function Admissions() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [statusAppNo, setStatusAppNo] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const submit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        address: {
          street: form['address.street'],
          city: form['address.city'],
          state: form['address.state'],
          pincode: form['address.pincode'],
        },
      };
      const res = await admissionAPI.submit(payload);
      setSuccess(res.applicationNumber);
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (e) => {
    e.preventDefault();
    if (!statusAppNo.trim()) return;
    setStatusLoading(true);
    setStatusResult(null);
    try {
      const res = await admissionAPI.checkStatus(statusAppNo.trim());
      setStatusResult(res.data);
    } catch (err) {
      setStatusResult({ error: err.message });
    } finally {
      setStatusLoading(false);
    }
  };

  const statusColor = { Pending: '#e67e22', 'Under Review': '#3498db', Shortlisted: '#9b59b6', Admitted: '#2d7a3a', Waitlisted: '#7f8c8d', Rejected: '#c0392b' };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Admissions 2026-27 | Vidya Vihar International School</title>
        <meta name="description" content="Apply for admission to Vidya Vihar International School for the 2026-27 academic year. Online application form, spot admissions, and easy status tracking." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › <span>Admissions</span></p>
          <h1>Admissions 2026–27</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, marginTop: 12 }}>Applications are open for all classes. Secure your child's future — apply today.</p>
        </div>
      </div>

      <section className="section section--cream">
        <div className="container">
          <div className="admissions__layout">
            {/* Main form area */}
            <div className="admissions__main">
              {success ? (
                <div className="admissions__success">
                  <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
                  <CheckCircle size={52} color="var(--success)" style={{ marginBottom: 16 }} />
                  <h2>Application Submitted Successfully!</h2>
                  <p>Thank you for choosing Vidya Vihar International School. Your application has been received.</p>
                  <div className="admissions__appnum-box">
                    <div className="admissions__appnum-label">Your Application Number</div>
                    <div className="admissions__appnum">{success}</div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 440, margin: '0 auto 24px' }}>
                    A confirmation email with all details has been sent to <strong>{form.email}</strong>. 
                    Our admissions team will contact you within 48 working hours.
                  </p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-outline" onClick={() => { setSuccess(null); setForm(initialForm); setStep(0); }}>Submit Another Application</button>
                    <Link to="/admission-status" className="btn btn-primary">Track Application Status</Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Stepper */}
                  <div className="admissions__stepper">
                    {STEPS.map((s, i) => (
                      <React.Fragment key={i}>
                        <div className={`admissions__step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                          <div className="admissions__step-num">{i < step ? '✓' : i + 1}</div>
                          <div className="admissions__step-label">{s}</div>
                        </div>
                        {i < STEPS.length - 1 && <div className={`admissions__step-line ${i < step ? 'done' : ''}`} />}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="admissions__form-card">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Step 0: Student Info */}
                        {step === 0 && (
                          <div>
                            <h3 className="admissions__step-title">Student Information</h3>
                            <div className="grid-2">
                              <div className="form-group">
                                <label className="form-label">Student's Full Name <span className="required">*</span></label>
                                <input className="form-control" name="studentName" value={form.studentName} onChange={handle} required placeholder="As per birth certificate" />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Class Applying For <span className="required">*</span></label>
                                <select className="form-control" name="classAppliedFor" value={form.classAppliedFor} onChange={handle} required>
                                  <option value="">Select Class</option>
                                  {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                              </div>
                              <div className="form-group">
                                <label className="form-label">Date of Birth <span className="required">*</span></label>
                                <input type="date" className="form-control" name="dateOfBirth" value={form.dateOfBirth} onChange={handle} required />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Gender <span className="required">*</span></label>
                                <select className="form-control" name="gender" value={form.gender} onChange={handle} required>
                                  <option value="">Select</option>
                                  <option>Male</option><option>Female</option><option>Other</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label className="form-label">Previous School (if any)</label>
                                <input className="form-control" name="previousSchool" value={form.previousSchool} onChange={handle} placeholder="Name of previous school" />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Blood Group</label>
                                <select className="form-control" name="bloodGroup" value={form.bloodGroup} onChange={handle}>
                                  <option value="">Select</option>
                                  {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
                                </select>
                              </div>
                              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                                <label className="form-label">Known Medical Conditions / Allergies</label>
                                <input className="form-control" name="medicalConditions" value={form.medicalConditions} onChange={handle} placeholder="Leave blank if none" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step 1: Parent Info */}
                        {step === 1 && (
                          <div>
                            <h3 className="admissions__step-title">Parent / Guardian Information</h3>
                            <div className="grid-2">
                              <div className="form-group">
                                <label className="form-label">Father's Full Name <span className="required">*</span></label>
                                <input className="form-control" name="fatherName" value={form.fatherName} onChange={handle} required placeholder="Father's full name" />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Mother's Full Name <span className="required">*</span></label>
                                <input className="form-control" name="motherName" value={form.motherName} onChange={handle} required placeholder="Mother's full name" />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Primary Contact <span className="required">*</span></label>
                                <input className="form-control" name="primaryContact" value={form.primaryContact} onChange={handle} required placeholder="10-digit mobile number" maxLength={10} />
                              </div>
                              <div className="form-group">
                                <label className="form-label">Alternate Contact</label>
                                <input className="form-control" name="alternateContact" value={form.alternateContact} onChange={handle} placeholder="Optional" maxLength={10} />
                              </div>
                              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                                <label className="form-label">Email Address <span className="required">*</span></label>
                                <input type="email" className="form-control" name="email" value={form.email} onChange={handle} required placeholder="Confirmation will be sent to this email" />
                              </div>
                              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                                <label className="form-label">Admission Type</label>
                                <div style={{ display: 'flex', gap: 16 }}>
                                  {['Online', 'Spot', 'Regular'].map(t => (
                                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                      <input type="radio" name="admissionType" value={t} checked={form.admissionType === t} onChange={handle} />
                                      <span style={{ fontWeight: 500, color: 'var(--navy)' }}>{t}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step 2: Address */}
                        {step === 2 && (
                          <div>
                            <h3 className="admissions__step-title">Residential Address</h3>
                            <div className="grid-2">
                              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                                <label className="form-label">Street / Area / Locality <span className="required">*</span></label>
                                <input className="form-control" name="address.street" value={form['address.street']} onChange={handle} required placeholder="House no., Street, Area" />
                              </div>
                              <div className="form-group">
                                <label className="form-label">City <span className="required">*</span></label>
                                <input className="form-control" name="address.city" value={form['address.city']} onChange={handle} required placeholder="City" />
                              </div>
                              <div className="form-group">
                                <label className="form-label">State <span className="required">*</span></label>
                                <select className="form-control" name="address.state" value={form['address.state']} onChange={handle} required>
                                  <option value="">Select State</option>
                                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </div>
                              <div className="form-group">
                                <label className="form-label">PIN Code <span className="required">*</span></label>
                                <input className="form-control" name="address.pincode" value={form['address.pincode']} onChange={handle} required placeholder="6-digit PIN" maxLength={6} />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step 3: Facilities */}
                        {step === 3 && (
                          <div>
                            <h3 className="admissions__step-title">Additional Facilities</h3>
                            <div className="admissions__facility-option">
                              <div className="admissions__facility-toggle">
                                <input type="checkbox" id="transport" name="transportRequired" checked={form.transportRequired} onChange={handle} />
                                <label htmlFor="transport">
                                  <div className="admissions__facility-icon">🚌</div>
                                  <div>
                                    <strong>School Transport</strong>
                                    <p>GPS-tracked buses covering 5 city zones. ₹1,600–₹2,000/month.</p>
                                  </div>
                                </label>
                              </div>
                              {form.transportRequired && (
                                <div className="form-group" style={{ marginTop: 12, marginLeft: 36 }}>
                                  <label className="form-label">Select Route</label>
                                  <select className="form-control" name="transportRoute" value={form.transportRoute} onChange={handle}>
                                    <option value="">Select your area route</option>
                                    {ROUTES.map(r => <option key={r} value={r}>{r}</option>)}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div className="admissions__facility-option" style={{ marginTop: 16 }}>
                              <div className="admissions__facility-toggle">
                                <input type="checkbox" id="hostel" name="hostelRequired" checked={form.hostelRequired} onChange={handle} />
                                <label htmlFor="hostel">
                                  <div className="admissions__facility-icon">🏠</div>
                                  <div>
                                    <strong>Hostel Accommodation</strong>
                                    <p>Fully furnished rooms with meals, 24/7 security. ₹4,500/month.</p>
                                  </div>
                                </label>
                              </div>
                              {form.hostelRequired && (
                                <div className="form-group" style={{ marginTop: 12, marginLeft: 36 }}>
                                  <label className="form-label">Hostel Type</label>
                                  <select className="form-control" name="hostelType" value={form.hostelType} onChange={handle}>
                                    <option value="">Select</option>
                                    <option value="Boys">Boys Hostel</option>
                                    <option value="Girls">Girls Hostel</option>
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Step 4: Review */}
                        {step === 4 && (
                          <div>
                            <h3 className="admissions__step-title">Review & Submit</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '0.9rem' }}>Please review your application before submitting. You can go back to edit any section.</p>
                            <div className="admissions__review-grid">
                              <div className="admissions__review-section">
                                <h4>Student Details</h4>
                                <div className="admissions__review-row"><span>Name:</span><strong>{form.studentName || '—'}</strong></div>
                                <div className="admissions__review-row"><span>Class:</span><strong>{form.classAppliedFor || '—'}</strong></div>
                                <div className="admissions__review-row"><span>D.O.B:</span><strong>{form.dateOfBirth || '—'}</strong></div>
                                <div className="admissions__review-row"><span>Gender:</span><strong>{form.gender || '—'}</strong></div>
                                {form.bloodGroup && <div className="admissions__review-row"><span>Blood Group:</span><strong>{form.bloodGroup}</strong></div>}
                              </div>
                              <div className="admissions__review-section">
                                <h4>Parent Details</h4>
                                <div className="admissions__review-row"><span>Father:</span><strong>{form.fatherName || '—'}</strong></div>
                                <div className="admissions__review-row"><span>Mother:</span><strong>{form.motherName || '—'}</strong></div>
                                <div className="admissions__review-row"><span>Contact:</span><strong>{form.primaryContact || '—'}</strong></div>
                                <div className="admissions__review-row"><span>Email:</span><strong>{form.email || '—'}</strong></div>
                              </div>
                              <div className="admissions__review-section">
                                <h4>Address</h4>
                                <div className="admissions__review-row"><span>City:</span><strong>{form['address.city'] || '—'}</strong></div>
                                <div className="admissions__review-row"><span>State:</span><strong>{form['address.state'] || '—'}</strong></div>
                                <div className="admissions__review-row"><span>PIN:</span><strong>{form['address.pincode'] || '—'}</strong></div>
                              </div>
                              <div className="admissions__review-section">
                                <h4>Facilities</h4>
                                <div className="admissions__review-row"><span>Transport:</span><strong>{form.transportRequired ? `Yes – ${form.transportRoute || 'Route TBD'}` : 'Not Required'}</strong></div>
                                <div className="admissions__review-row"><span>Hostel:</span><strong>{form.hostelRequired ? `Yes – ${form.hostelType || 'Type TBD'}` : 'Not Required'}</strong></div>
                                <div className="admissions__review-row"><span>Type:</span><strong>{form.admissionType}</strong></div>
                              </div>
                            </div>
                            <div className="admissions__declaration">
                              <p>I hereby declare that all the information provided in this application is true and correct to the best of my knowledge. I understand that any false information may result in rejection of the application or cancellation of admission.</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="admissions__form-nav">
                      {step > 0 && (
                        <button className="btn btn-outline" onClick={prev}><ChevronLeft size={16} /> Back</button>
                      )}
                      <div style={{ flex: 1 }} />
                      {step < STEPS.length - 1 ? (
                        <button className="btn btn-primary" onClick={next}>Next Step <ChevronRight size={16} /></button>
                      ) : (
                        <button className="btn btn-primary" onClick={submit} disabled={loading}>
                          {loading ? 'Submitting...' : 'Submit Application ✓'}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="admissions__sidebar">
              <div className="admissions__sidebar-card">
                <h4>📅 Key Dates</h4>
                <ul className="admissions__dates">
                  <li><span>Applications Open</span><strong>1st March 2026</strong></li>
                  <li><span>Last Date (Online)</span><strong>30th April 2026</strong></li>
                  <li><span>Spot Admission Days</span><strong>Mon–Sat, 9AM–3PM</strong></li>
                  <li><span>Document Verification</span><strong>By appointment</strong></li>
                  <li><span>Session Begins</span><strong>1st June 2026</strong></li>
                </ul>
              </div>

              <div className="admissions__sidebar-card">
                <h4>📋 Documents Required</h4>
                <ul className="admissions__docs">
                  {['Birth Certificate (Original + Copy)','Previous Class Marksheet / TC','Aadhar Card of Student & Parents','Passport-size Photographs (4)','Medical Fitness Certificate','Caste Certificate (if applicable)'].map((d, i) => (
                    <li key={i}><span>✓</span>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="admissions__sidebar-card" style={{ background: 'var(--navy)', borderColor: 'var(--navy)' }}>
                <h4 style={{ color: 'var(--white)' }}>📞 Admissions Helpdesk</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: 12 }}>Any questions? Our admissions team is here to help.</p>
                <a href="tel:+919876543210" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>+91 98765 43210</a>
                <a href="mailto:admissions@vidyavihar.edu.in" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Email Us</a>
              </div>

              {/* Status checker */}
              <div className="admissions__sidebar-card">
                <h4><Search size={16} style={{ display: 'inline', marginRight: 6 }} />Check Application Status</h4>
                <form onSubmit={checkStatus}>
                  <div className="form-group" style={{ marginBottom: 10 }}>
                    <input className="form-control" placeholder="Application No. (e.g. ADM20260001)" value={statusAppNo} onChange={e => setStatusAppNo(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }} disabled={statusLoading}>
                    {statusLoading ? 'Checking...' : 'Check Status'}
                  </button>
                </form>
                {statusResult && !statusResult.error && (
                  <div style={{ marginTop: 12, padding: 12, background: 'var(--cream)', borderRadius: 8, fontSize: '0.85rem' }}>
                    <div style={{ marginBottom: 4 }}><strong>{statusResult.studentName}</strong></div>
                    <div>{statusResult.classAppliedFor}</div>
                    <div style={{ marginTop: 8 }}>
                      <span style={{ background: statusColor[statusResult.status] + '22', color: statusColor[statusResult.status], padding: '3px 12px', borderRadius: 12, fontWeight: 700, fontSize: '0.8rem', border: `1px solid ${statusColor[statusResult.status]}44` }}>
                        {statusResult.status}
                      </span>
                    </div>
                  </div>
                )}
                {statusResult?.error && (
                  <p style={{ color: 'var(--error)', fontSize: '0.82rem', marginTop: 10 }}>{statusResult.error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
