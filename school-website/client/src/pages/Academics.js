import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Medal, Star, BookOpen, Microscope, Monitor, Music, Dumbbell } from 'lucide-react';
import './Academics.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

const STREAMS = [
  { label: 'Pre-Primary', grades: 'Nursery, LKG, UKG', icon: '🌱', desc: 'Activity-based, play-centric learning that builds curiosity, social skills, and a love for school through Montessori-inspired methods.' },
  { label: 'Primary', grades: 'Classes I – V', icon: '📚', desc: 'Strong foundational skills in Literacy, Numeracy, EVS, and Hindi with project-based learning and formative assessments.' },
  { label: 'Middle School', grades: 'Classes VI – VIII', icon: '🔬', desc: 'Structured BSET curriculum with separate labs, introduction to computers, and a wide range of co-curricular activities.' },
  { label: 'Secondary', grades: 'Classes IX – X', icon: '🎯', desc: 'BSET Board preparation with academic rigour, counselling, extra classes, and consistent doubt-clearing sessions.' },
  { label: 'Senior Secondary', grades: 'Classes XI – X', icon: '🏆', desc: 'Science (PCM/PCB), Commerce, and Humanities streams with expert faculty, career guidance, and JEE/NEET/CLAT coaching support.' },
];

const TOPPERS_12 = []; // Not applicable

const RECORDS = [
  { icon: <Trophy size={13} />, title: '100% Board Results', detail: '12 consecutive years — Class X & X both', color: '#d4af37' },
  { icon: <Medal size={13} />, title: 'AIR 47 – JEE Advanced', detail: 'Arjun Sharma, Class X PCM, 2025', color: '#c0c0c0' },
  { icon: <Star size={13} />, title: '47 State Toppers', detail: 'Across all streams in the last 5 years', color: '#cd7f32' },
  { icon: <Trophy size={13} />, title: 'NEET Rank 312', detail: 'Kavya Menon, Class X PCB, 2024', color: '#d4af37' },
  { icon: <Medal size={13} />, title: '200+ Olympiad Medals', detail: 'National & High– Maths, Science, English', color: '#c0c0c0' },
  { icon: <Star size={13} />, title: 'Best School Award', detail: '"School of Excellence" – BSET 2019 & 2023', color: '#cd7f32' },
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
        <title>Academics | Akshara High School</title>
        <meta name="description" content="Explore Akshara's curriculum from Pre-Primary to Class X, our top academic achievers, school records, and world-class facilities." />
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
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>Year after year, our students set new benchmarks in BSET board examinations.</p>
          </div>
          <div className="academics__topper-tabs">
            {[['10','Class X Toppers'],['12','Class X Toppers']].map(([v, l]) => (
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
