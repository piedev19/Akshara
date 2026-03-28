import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, GraduationCap } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef(null);


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, []);

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHome = location.pathname === '/';

  // ✅ NAV ITEMS (dynamic)
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
    },

    {
      label: 'Life @ School',
      children: [
        { label: 'Transport', path: '/transport' },
        { label: 'Hostel', path: '/hostel' },
      ],
    },

    { label: 'Contact', path: '/contact' },

    // ✅ ONLY IF ADMIN
    ...(isAdmin
      ? [
          { label: 'Admin', path: '/admin/admissions' },

          {
            label: 'Logout',
            action: 'logout',
          },
        ]
      : []),
  ];

  // ✅ Handle logout
  const handleAction = (item) => {
    if (item.action === 'logout') {
      localStorage.removeItem('adminToken');
      setIsAdmin(false);
      window.location.href = '/';
    }
  };

  return (
    <header className={`navbar ${scrolled || !isHome ? 'navbar--solid' : 'navbar--transparent'}`}>

      {/* TOP BAR */}
      <div className="navbar__topbar">
        <div className="container navbar__topbar-inner">
          <span><Phone size={12} /> +91 9494817676 | aksharaschoolkhankapur@gmail.com</span>
          <span>Affiliated to BSET | School Code: 3604 | Academic Year 2026-27</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="navbar__main">
        <div className="container navbar__inner">

          {/* LOGO */}
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-emblem">
              <GraduationCap size={13} />
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">AKSHARA</span>
              <span className="navbar__logo-sub">HIGH SCHOOL</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="navbar__nav" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="navbar__item"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >

                {/* NORMAL LINK */}
                {item.path && !item.children && !item.action && (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                )}

                {/* DROPDOWN */}
                {item.children && (
                  <button className="navbar__link navbar__link--btn">
                    {item.label}
                    <ChevronDown size={14} className={`navbar__chevron ${activeDropdown === item.label ? 'open' : ''}`} />
                  </button>
                )}

                {/* ACTION (LOGOUT) */}
                {item.action && (
                  <button
                    className="navbar__link"
                    onClick={() => handleAction(item)}
                  >
                    {item.label}
                  </button>
                )}

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      className="navbar__dropdown"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.path} className="navbar__dropdown-item">
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
            APPLY FOR ADMISSION
          </Link>

          {/* MOBILE BUTTON */}
          <button className="navbar__mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="navbar__mobile-item">

                {item.path && !item.children && !item.action && (
                  <Link to={item.path}>{item.label}</Link>
                )}

                {item.children && (
                  <>
                    <span>{item.label}</span>
                    {item.children.map((child) => (
                      <Link key={child.label} to={child.path}>
                        {child.label}
                      </Link>
                    ))}
                  </>
                )}

                {item.action && (
                  <button onClick={() => handleAction(item)}>
                    {item.label}
                  </button>
                )}

              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}