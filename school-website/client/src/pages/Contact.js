import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { contactAPI } from '../utils/api';
import './Contact.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const TYPES = ['General','Admission Enquiry','Transport','Hostel','Fee','Academic','Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', type: 'General' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.send(form);
      setSent(true);
      toast.success('Message sent successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Contact Us | Akshara High School</title>
        <meta name="description" content="Get in touch with Akshara High School. Call, email, or visit us. Admissions helpdesk available Mon–Sat 8AM–5PM." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › <span>Contact Us</span></p>
          <h1>Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, marginTop: 12 }}>
            We'd love to hear from you. Reach out for admissions, general queries, or just to learn more about our school.
          </p>
        </div>
      </div>

      <section className="section section--cream">
        <div className="container">
          {/* Contact Cards */}
          <div className="contact__cards">
            {[
              { icon: <Phone size={24} />, title: 'Call Us', lines: ['+91 98765 43210', '+91 94948 17575'], note: 'Mon–Sat, 8AM–5PM', href: 'tel:+919876543210' },
              { icon: <Mail size={24} />, title: 'Email Us', lines: ['aksharaschoolkhankapur@gmail.com', 'info@akshara.edu.in'], note: 'Reply within 24 hours', href: 'mailto:info@akshara.edu.in' },
              { icon: <MapPin size={24} />, title: 'Visit Us', lines: ['Near KNR Garden ,', 'Kankapur, Nirmal, Telangana – 504101'], note: 'GPS: 17.3850° N, 78.4867° E', href: 'https://maps.google.com' },
              { icon: <Clock size={24} />, title: 'Office Hours', lines: ['Mon–Fri: 8:00 AM – 5:00 PM', 'Saturday: 9:00 AM – 1:00 PM'], note: 'Closed Sundays & holidays', href: null },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="contact__card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="contact__card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                {card.lines.map((l, j) => (
                  <p key={j}>{card.href && j === 0 ? <a href={card.href}>{l}</a> : l}</p>
                ))}
                <small>{card.note}</small>
              </motion.div>
            ))}
          </div>

          <div className="contact__layout">
            {/* Form */}
            <div className="contact__form-wrapper">
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 6, fontSize: '1.5rem' }}>Send Us a Message</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 13, fontSize: '0.9rem' }}>Fill in the form and we'll get back to you within 24 hours.</p>

              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--cream)', borderRadius: 12 }}>
                  <div style={{ fontSize: '3rem', marginBottom: 12 }}>✉️</div>
                  <h3 style={{ color: 'var(--navy)', marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you, <strong>{form.name}</strong>. We'll reply to <strong>{form.email}</strong> within 24 hours.</p>
                  <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '', type: 'General' }); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Your Name <span className="required">*</span></label>
                      <input className="form-control" name="name" value={form.name} onChange={handle} required placeholder="Full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address <span className="required">*</span></label>
                      <input type="email" className="form-control" name="email" value={form.email} onChange={handle} required placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input className="form-control" name="phone" value={form.phone} onChange={handle} placeholder="Optional" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Enquiry Type</label>
                      <select className="form-control" name="type" value={form.type} onChange={handle}>
                        {TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Subject <span className="required">*</span></label>
                      <input className="form-control" name="subject" value={form.subject} onChange={handle} required placeholder="Brief subject of your enquiry" />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Message <span className="required">*</span></label>
                      <textarea className="form-control" name="message" value={form.message} onChange={handle} required rows={5} placeholder="Write your message here..." style={{ resize: 'vertical', minHeight: 120 }} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
                    {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Map + Social */}
            <div className="contact__right">
              <div className="contact__map">
                <iframe
                  title="School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30452.018932040326!2d78.4483!3d17.4065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: 12 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="contact__social-box">
                <h4>Follow Us</h4>
                <p>Stay updated with school news, events, and achievements.</p>
                <div className="contact__social-links">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact__social-link contact__social-link--instagram">
                    <Instagram size={20} /><div><strong>Instagram</strong><span>@aksharaschool</span></div>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="contact__social-link contact__social-link--facebook">
                    <Facebook size={20} /><div><strong>Facebook</strong><span>/aksharaschool</span></div>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="contact__social-link contact__social-link--youtube">
                    <Youtube size={20} /><div><strong>YouTube</strong><span>@aksharaschool</span></div>
                  </a>
                </div>
              </div>

              <div className="contact__admission-box">
                <h4>🏫 Admissions Enquiry?</h4>
                <p>For quick admissions enquiries, call our dedicated helpdesk or apply directly online.</p>
                <a href="tel:+919876543210" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>📞 +91 98765 43210</a>
                <a href="/admissions" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Apply Online</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
