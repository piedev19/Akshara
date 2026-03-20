import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';

export default function FloatingAdmission() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (dismissed || location.pathname === '/admissions') return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [dismissed, location.pathname]);

  if (location.pathname === '/admissions') return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '24px',
            zIndex: 999,
            background: 'var(--navy)',
            borderRadius: '14px',
            padding: '20px 24px',
            boxShadow: '0 20px 60px rgba(13,33,55,0.35)',
            maxWidth: '280px',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          <button
            onClick={() => { setVisible(false); setDismissed(true); }}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer', padding: '4px',
            }}
          >
            <X size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '36px', height: '36px', background: 'var(--gold)',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <GraduationCap size={20} color="var(--navy)" />
            </div>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                Admissions Open
              </div>
              <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.2 }}>
                2026–27 Academic Year
              </div>
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '14px', lineHeight: 1.6 }}>
            Limited seats available. Apply now to secure your child's future.
          </p>

          <Link
            to="/admissions"
            onClick={() => setVisible(false)}
            style={{
              display: 'block',
              background: 'var(--gold)',
              color: 'var(--navy)',
              textAlign: 'center',
              padding: '10px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Apply Now →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
