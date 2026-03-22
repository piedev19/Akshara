import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import './NewsStrip.css';

const NEWS = [];

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
