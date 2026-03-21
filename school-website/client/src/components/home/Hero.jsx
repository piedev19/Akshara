import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Award, Users, BookOpen, Star } from 'lucide-react';
import './Hero.css';

const SLIDES = [
  {
    bg: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweo6i_UZEPCfX_f1H7kdeySFC47wzR1y-YXsfn5UauTsYIbpPF-E6TiNa8l-MlRKoNkehXZf-4coiM3egwXuLBH8dnk-CbgUNB9dIsF21xL-7tQlZ4K0WuAeNHNl1nYjBGwm-m-w=s1360-w1360-h1020-rw',
    tag: 'Welcome to Akshara High School',
    title: 'Where Excellence\nMeets Opportunity',
    subtitle: 'Nursery to Class X | Established 2013',
    cta: { primary: { label: 'Apply for Admission', to: '/admissions' }, secondary: { label: 'Explore Our Campus', to: '/gallery' } },
  },
  {
    bg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80',
    tag: 'Academic Excellence',
    title: '100% Results\nYear After Year',
    subtitle: 'Our students consistently top boards and national competitions.',
    cta: { primary: { label: 'View Achievements', to: '/academics#achievers' }, secondary: { label: 'Our Programmes', to: '/academics' } },
  },
  {
    bg: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80',
    tag: 'Holistic Development',
    title: 'Sports, Arts,\nAnd Beyond',
    subtitle: 'A campus designed to nurture every talent — in and out of the classroom.',
    cta: { primary: { label: 'Discover Campus Life', to: '/gallery' }, secondary: { label: 'Apply Now', to: '/admissions' } },
  },
];

const STATS = [
  { icon: <Award size={24} />, value: '100%', label: 'Board Results' },
  { icon: <Users size={24} />, value: '1,200+', label: 'Students Enrolled' },
  { icon: <BookOpen size={24} />, value: '13+', label: 'Years of Excellence' },
  { icon: <Star size={24} />, value: '30+', label: 'Experienced Faculty' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="hero" aria-label="School hero banner">
      {/* Background */}
      <div className="hero__bg-wrapper">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`hero__bg ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url('${s.bg}')` }}
          />
        ))}
        <div className="hero__overlay" />
        {/* Decorative pattern */}
        <div className="hero__pattern" />
      </div>

      {/* Content */}
      <div className="hero__content">
        <div className="container">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero__text"
          >
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              {slide.tag}
              <span className="hero__eyebrow-dot" />
            </div>

            <h1 className="hero__title">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i < slide.title.split('\n').length - 1 && <br />}</span>
              ))}
            </h1>

            <p className="hero__subtitle">{slide.subtitle}</p>

            <div className="hero__cta">
              <Link to={slide.cta.primary.to} className="btn btn-primary btn-lg">
                {slide.cta.primary.label}
              </Link>
              <Link to={slide.cta.secondary.to} className="btn btn-secondary btn-lg">
                {slide.cta.secondary.label}
              </Link>
            </div>

            {/* Admission badge */}
            <div className="hero__badge">
              <div className="hero__badge-dot" />
              <span>Admissions Open: 2026–27 Academic Year</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hero__indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__indicator ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats bar */}
      <div className="hero__stats">
        <div className="container hero__stats-inner">
          {STATS.map((stat, i) => (
            <div key={i} className="hero__stat">
              <div className="hero__stat-icon">{stat.icon}</div>
              <div>
                <div className="hero__stat-value">{stat.value}</div>
                <div className="hero__stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#why-us" className="hero__scroll" aria-label="Scroll down">
        <ChevronDown size={24} />
      </a>
    </section>
  );
}
