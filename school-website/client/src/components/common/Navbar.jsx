import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, GraduationCap } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'Our Story & Establishment', path: '/about#story' },
      { label: 'Vision & Values', path: '/about#vision' },
      { label: 'Our Faculty', path: '/about#faculty' },
      { label: 'Board of Directors', path: '/about#board' },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    children: [
      { label: 'Curriculum & Programmes', path: '/academics#curriculum' },
      { label: 'Achievers & Toppers', path: '/academics#achievers' },
      { label: 'School Records', path: '/academics#records' },
      { label: 'Facilities & Labs', path: '/academics#facilities' },
    ],
  },
  {
    label: 'Life @ School',
    children: [
      { label: 'Transport', path: '/transport' },
      { label: 'Hostel', path: '/hostel' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'News & Events', path: '/news' },
    ],
  },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <header className={`navbar ${scrolled || !isHome ? 'navbar--solid' : 'navbar--transparent'}`}>
      {/* Top bar */}
      <div className="navbar__topbar">
        <div className="container navbar__topbar-inner">
          <span><Phone size={12} /> +91 98765 43210 &nbsp;|&nbsp; admissions@vidyavihar.edu.in</span>
          <span>Affiliated to CBSE | School Code: 12345 | Academic Year 2026-27</span>
        </div>
      </div>

      <div className="navbar__main">
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-emblem">
              <GraduationCap size={28} />
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">AKSHARA</span>
              <span className="navbar__logo-sub">HIGH SCHOOL </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="navbar__item"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.path && !item.children ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button className="navbar__link navbar__link--btn">
                    {item.label}
                    <ChevronDown size={14} className={`navbar__chevron ${activeDropdown === item.label ? 'open' : ''}`} />
                  </button>
                )}

                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      className="navbar__dropdown"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                    >
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.path} className="navbar__dropdown-item">
                          <span className="navbar__dropdown-dot" />
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <Link to="/admissions" className="btn btn-primary btn-sm navbar__cta">
            Apply Now
          </Link>

          {/* Mobile toggle */}
          <button className="navbar__mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="navbar__mobile-item">
                {item.path && !item.children ? (
                  <Link to={item.path} className="navbar__mobile-link">{item.label}</Link>
                ) : (
                  <>
                    <span className="navbar__mobile-section">{item.label}</span>
                    {item.children?.map((child) => (
                      <Link key={child.label} to={child.path} className="navbar__mobile-sub">
                        {child.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            ))}
            <div className="navbar__mobile-cta">
              <Link to="/admissions" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Apply for Admission 2026-27
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
