import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon"><GraduationCap size={28} /></div>
              <div>
                <div className="footer__logo-name">Akshara</div>
                <div className="footer__logo-sub">High School</div>
              </div>
            </div>
            <p className="footer__tagline">
              Nurturing minds, building character, and shaping leaders since 2013. 
              Affiliated to State for classes Nursery through XII.
            </p>
            <div className="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer__social-link">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer__social-link">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer__social-link">
                <Youtube size={18} />
              </a>
            </div>
            <div className="footer__affiliation">
              <span className="badge badge-gold">State Affiliated</span>
              <span className="badge badge-gold">School Code: 504310</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/academics', label: 'Academics' },
                { to: '/admissions', label: 'Admissions 2026-27' },
                { to: '/gallery', label: 'Photo Gallery' },
                { to: '/news', label: 'News & Events' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div className="footer__col">
            <h4 className="footer__heading">Facilities</h4>
            <ul className="footer__links">
              {[
                { to: '/transport', label: 'Transport Services' },
                { to: '/hostel', label: 'Hostel (Boys & Girls)' },
                { to: '/academics#facilities', label: 'Science Labs' },
                { to: '/academics#facilities', label: 'Digital Library' },
                { to: '/academics#facilities', label: 'Sports Complex' },
                { to: '/academics#facilities', label: 'Computer Centre' },
                { to: '/academics#facilities', label: 'Auditorium' },
              ].map((link, i) => (
                <li key={i}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__contact">
              <li>
                <MapPin size={16} />
                <span>Kankapur, Nirmal, Telangana – 504106</span>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+919494817575">+91 94948 17575</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+919494817676">+91 9494817676</a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:admissions@akshara.edu.in">admissions@akshara.edu.in</a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:info@akshara.edu.in">info@akshara.edu.in</a>
              </li>
            </ul>

            <div className="footer__hours">
              <strong>Office Hours</strong><br />
              Mon – Fri: 8:00 AM – 5:00 PM<br />
              Saturday: 9:00 AM – 1:00 PM
            </div>

            <Link to="/admissions" className="btn btn-primary btn-sm footer__cta">
              Apply for Admission
            </Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Akshara Hgh School. All Rights Reserved.</p>
          <div className="footer__bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <Link to="/admission-status">Check Admission Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
