import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Medal, Star, BookOpen, Microscope, Monitor, Music, Dumbbell } from 'lucide-react';
import './Academics.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

const STREAMS = [
  { 
    label: 'Pre-Primary', 
    grades: 'Nursery, LKG, UKG', 
    icon: '🌱', 
    desc: 'A caring and engaging environment where young children learn through play, stories, and simple activities. Focus is on developing basic communication skills, confidence, and comfort with the school routine.' 
  },
  { 
    label: 'Primary', 
    grades: 'Classes I – V', 
    icon: '📚', 
    desc: 'Building strong foundations in reading, writing, and mathematics along with general awareness. Teaching includes classroom activities, basic projects, and regular assessments to support steady learning.' 
  },
  { 
    label: 'Middle School', 
    grades: 'Classes VI – VIII', 
    icon: '🔬', 
    desc: 'A structured approach to subjects like Science, Mathematics, and Social Studies with introduction to practical learning, basic computer knowledge, and co-curricular activities for overall development.' 
  },
  { 
    label: 'Secondary', 
    grades: 'Classes IX – X', 
    icon: '🎯', 
    desc: 'Focused preparation for state board examinations with regular tests, revision sessions, and guidance from teachers to help students perform with confidence.' 
  },
  { 
    label: 'Higher Secondary', 
    grades: 'Classes XI – XII', 
    icon: '🏆', 
    desc: 'Offering streams such as Science, Commerce, and Arts with dedicated teaching, concept clarity, and support for board exams and future academic choices.' 
  },
];
const TOPPERS_10 = [
  { name: 'Rahul Mehta', score: '10.0 GPA', year: '2025', img: null },
  { name: 'Divya Krishnan', score: '10.0 GPA', year: '2025', img: null },
  { name: 'Amir Khan', score: '9.8 GPA', year: '2025', img: null },
  { name: 'Pooja Sharma', score: '9.7 GPA', year: '2024', img: null },
];

const TOPPERS_12 = []; // Not applicable

const RECORDS = [
  { 
    icon: <Trophy size={28} />, 
    title: 'Consistent Board Results', 
    detail: 'Good pass percentage in Class X every year', 
    color: '#d4af37' 
  },
  { 
    icon: <Medal size={28} />, 
    title: 'School Top Performers', 
    detail: 'Students achieving 9.5+ GPA in SSC exams', 
    color: '#c0c0c0' 
  },
  { 
    icon: <Star size={28} />, 
    title: 'Participation in Competitions', 
    detail: 'Students take part in district & school-level events', 
    color: '#cd7f32' 
  },
  { 
    icon: <Trophy size={28} />, 
    title: 'Sports Achievements', 
    detail: 'Zonal and inter-school level participation', 
    color: '#d4af37' 
  },
];

const FACILITIES = [
  { 
    icon: <Microscope size={24} />, 
    name: 'Science Lab', 
    detail: 'Basic lab facilities for practical learning' 
  },
  { 
    icon: <Monitor size={24} />, 
    name: 'Computer Lab', 
    detail: 'Basic computer education for students' 
  },
  // { 
  //   icon: <BookOpen size={24} />, 
  //   name: 'Library', 
  //   detail: 'Collection of textbooks and reference books' 
  // },
  { 
    icon: <Dumbbell size={24} />, 
    name: 'Sports Facilities', 
    detail: 'Playground for outdoor games and activities' 
  },
  { 
    icon: <Music size={24} />, 
    name: 'Cultural Activities', 
    detail: 'Encouraging arts, music, and school events' 
  },
];

export default function Academics() {
  const [activeTab, setActiveTab] = useState('10');
  const { ref: streamRef, inView: streamInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: achieversRef, inView: achieversInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: recordsRef, inView: recordsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const toppers = activeTab === '10' ? TOPPERS_10 : TOPPERS_12;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Academics | Akshara Hgh School</title>
        <meta name="description" content="Explore Akshara's curriculum from Pre-Primary to Class XII, our top academic achievers, school records, and world-class facilities." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › <span>Academics</span></p>
          <h1>Academics</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, marginTop: 12 }}>
            A curriculum designed to challenge, inspire, and prepare every student for a world of possibilities.
          </p>
        </div>
      </div>

      {/* Curriculum */}
      <section className="section section--white" id="curriculum">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Curriculum & Programmes</span>
            <h2>Learning Pathways for<br /><em>Every Stage</em></h2>
            <div className="gold-divider" />
            <p className="subtitle">From playful early years to rigorous board preparation — our programmes are carefully structured to meet every child where they are.</p>
          </div>
          <div className="academics__streams" ref={streamRef}>
            {STREAMS.map((s, i) => (
              <motion.div
                key={i}
                className="academics__stream-card"
                initial={{ opacity: 0, y: 30 }}
                animate={streamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="academics__stream-icon">{s.icon}</div>
                <div>
                  <div className="academics__stream-grades">{s.grades}</div>
                  <h3 className="academics__stream-label">{s.label}</h3>
                  <p className="academics__stream-desc">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievers */}
      <section className="section section--dark" id="achievers" ref={achieversRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Toppers & Achievers</span>
            <h2 style={{ color: 'var(--white)' }}>Board Exam<br /><em style={{ color: 'var(--gold)' }}>Toppers</em></h2>
            <div className="gold-divider" />
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>Year after year, our students set new benchmarks in State board examinations.</p>
          </div>
          <div className="academics__topper-tabs">
            {[['10','Class X Toppers']].map(([v, l]) => (
              <button key={v} className={`academics__topper-tab ${activeTab === v ? 'active' : ''}`} onClick={() => setActiveTab(v)}>{l}</button>
            ))}
          </div>
          <div className="academics__toppers-grid">
            {toppers.map((t, i) => (
              <motion.div
                key={i + activeTab}
                className="academics__topper-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={achieversInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {i === 0 && <div className="academics__topper-crown">👑</div>}
                <img src={t.img} alt={t.name} />
                <div className="academics__topper-score">{t.score}</div>
                <h4>{t.name}</h4>
                <div className="academics__topper-meta">{t.stream ? `${t.stream} Stream` : `Class X`} • {t.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* School Records */}
      <section className="section section--cream" id="records" ref={recordsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">School Records</span>
            <h2>Achievements That<br /><em>Define Us</em></h2>
            <div className="gold-divider" />
          </div>
          <div className="academics__records-grid">
            {RECORDS.map((r, i) => (
              <motion.div
                key={i}
                className="academics__record-card"
                initial={{ opacity: 0, y: 30 }}
                animate={recordsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="academics__record-icon" style={{ background: r.color + '22', color: r.color }}>{r.icon}</div>
                <h4>{r.title}</h4>
                <p>{r.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section section--white" id="facilities">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Infrastructure</span>
            <h2>World-Class<br /><em>Facilities</em></h2>
            <div className="gold-divider" />
          </div>
          <div className="academics__facilities-grid">
            {FACILITIES.map((f, i) => (
              <div key={i} className="academics__facility-card">
                <div className="academics__facility-icon">{f.icon}</div>
                <h4>{f.name}</h4>
                <p>{f.detail}</p>
              </div>
            ))}
          </div>
          <div className="academics__facility-img-row">
            {[
              'https://images.unsplash.com/photo-1532094349884-543559c10c2b?w=600&q=70',
              'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=70',
              'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=70',
            ].map((src, i) => (
              <div key={i} className="academics__facility-img"><img src={src} alt="facility" /></div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
