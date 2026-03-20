import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Star, Award } from 'lucide-react';
import './AchieversPreview.css';

const TOPPERS = [
  { name: 'Arjun Sharma', class: 'Class XII Science', score: '99.2%', rank: 'AIR 47 – JEE Advanced', img: 'https://i.pravatar.cc/150?img=11', category: 'Academic' },
  { name: 'Priya Reddy', class: 'Class XII Commerce', score: '98.8%', rank: 'State Topper – CBSE', img: 'https://i.pravatar.cc/150?img=47', category: 'Academic' },
  { name: 'Rahul Mehta', class: 'Class X', score: '99.0%', rank: 'District Rank 1 – CBSE', img: 'https://i.pravatar.cc/150?img=12', category: 'Academic' },
  { name: 'Sneha Kulkarni', class: 'Class XII Arts', score: '97.6%', rank: 'NSD Scholarship Winner', img: 'https://i.pravatar.cc/150?img=48', category: 'Arts' },
  { name: 'Karan Patel', class: 'Class XI', score: 'Gold Medal', rank: 'National Science Olympiad', img: 'https://i.pravatar.cc/150?img=15', category: 'Science' },
  { name: 'Ananya Iyer', class: 'Class IX', score: '1st Place', rank: 'State Badminton – U-16', img: 'https://i.pravatar.cc/150?img=49', category: 'Sports' },
];

const RECORDS = [
  { icon: <Trophy size={22} />, label: '100% Board Results', sub: '12 consecutive years' },
  { icon: <Star size={22} />, label: '47 State Toppers', sub: 'In the last 5 years' },
  { icon: <Award size={22} />, label: '200+ Olympiad Medals', sub: 'National & International' },
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
