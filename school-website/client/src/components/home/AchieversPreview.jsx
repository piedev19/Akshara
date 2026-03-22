import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Star, Award } from 'lucide-react';
import './AchieversPreview.css';

const TOPPERS = [
  { 
    name: 'Rahul Kumar', 
    class: 'Class X', 
    score: '10.0 GPA', 
    rank: 'School Topper', 
    img: null, 
    category: 'Academic' 
  },
  { 
    name: 'Sravani Reddy', 
    class: 'Class X', 
    score: '9.8 GPA', 
    rank: 'Top Performer', 
    img: null, 
    category: 'Academic' 
  },
  { 
    name: 'Mahesh Yadav', 
    class: 'Class IX', 
    score: 'Best Student Award', 
    rank: 'Academic Excellence', 
    img: null, 
    category: 'Academic' 
  },
  { 
    name: 'Anjali', 
    class: 'Class VIII', 
    score: '1st Prize', 
    rank: 'School Drawing Competition', 
    img: null, 
    category: 'Arts' 
  },
  { 
    name: 'Rohit', 
    class: 'Class X', 
    score: '1st Place', 
    rank: 'Zonal Kabaddi', 
    img: null, 
    category: 'Sports' 
  },
  { 
    name: 'Kavya', 
    class: 'Class VII', 
    score: 'Participation', 
    rank: 'Science Fair', 
    img: null, 
    category: 'Science' 
  },
];

const RECORDS = [
  { icon: <Trophy size={22} />, label: 'Good Board Results', sub: 'Consistent pass percentage every year' },
  { icon: <Star size={22} />, label: 'Active Participation', sub: 'Students in sports & cultural events' },
  { icon: <Award size={22} />, label: 'School Level Achievements', sub: 'Competitions and annual events' },
];

const categoryColor = { Academic: '#1a3a5c', Sports: '#2d7a3a', Arts: '#7a3a5c', Science: '#3a5c1a' };

export default function AchieversPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="achievers section section--dark" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Hall of Fame</span>
          <h2 style={{ color: 'var(--white)' }}>Our Students Who<br /><em style={{ color: 'var(--gold)' }}>Made Us Proud</em></h2>
          <div className="gold-divider" />
          <p className="subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Year after year, our students go on to achieve extraordinary things — in academics, sports, and the arts.
          </p>
        </div>

        {/* Record highlights */}
        <div className="achievers__records">
          {RECORDS.map((r, i) => (
            <motion.div
              key={i}
              className="achievers__record"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="achievers__record-icon">{r.icon}</div>
              <div>
                <div className="achievers__record-label">{r.label}</div>
                <div className="achievers__record-sub">{r.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toppers grid */}
        <div className="achievers__grid">
          {TOPPERS.map((t, i) => (
            <motion.div
              key={i}
              className="achievers__card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            >
              <div className="achievers__card-top">
                <img src={t.img} alt={t.name} className="achievers__avatar" />
                <span
                  className="badge"
                  style={{ background: categoryColor[t.category] + '33', color: '#fff', border: `1px solid ${categoryColor[t.category]}88` }}
                >
                  {t.category}
                </span>
              </div>
              <div className="achievers__card-body">
                <div className="achievers__score">{t.score}</div>
                <h4 className="achievers__name">{t.name}</h4>
                <div className="achievers__class">{t.class}</div>
                <div className="achievers__rank">{t.rank}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/academics#achievers" className="btn btn-primary">
            View All Achievers & Records
          </Link>
        </div>
      </div>
    </section>
  );
}
