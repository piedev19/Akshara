import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import './NewsStrip.css';

const NEWS = [
  '🏆 Congratulations to Arjun Sharma – AIR 47 in JEE Advanced 2025!',
  '📢 Admissions Open for 2026-27 Academic Year – Limited Seats Available',
  '🎭 Annual Day Celebration: 28th March 2026 at School Auditorium',
  '🌿 Eco Club wins National Green Schools Award for 3rd year running',
  '🏅 Our U-14 Cricket Team wins District Championship',
  '📚 New Digital Library Wing inaugurated – 10,000+ e-books now accessible',
  '🚌 Transport registration for 2026-27 now open – Register before April 15',
  '🏠 Hostel admissions open – Apply early to secure accommodation',
];

export default function NewsStrip() {
  return (
    <div className="news-strip">
      <div className="news-strip__label">
        <Bell size={14} />
        <span>Latest</span>
      </div>
      <div className="news-strip__track-wrapper">
        <div className="news-strip__track">
          {[...NEWS, ...NEWS].map((item, i) => (
            <span key={i} className="news-strip__item">
              {item}
              <span className="news-strip__sep">•</span>
            </span>
          ))}
        </div>
      </div>
      <Link to="/news" className="news-strip__link">All News →</Link>
    </div>
  );
}
