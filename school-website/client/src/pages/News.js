import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import './News.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

const CATEGORIES = ['All', 'News', 'Event', 'Achievement', 'Circular', 'Holiday'];

const NEWS_DATA = [
  { id: 1, category: 'Achievement', title: 'Arjun Sharma Secures AIR 47 in JEE Advanced 2025', excerpt: 'We are immensely proud of Arjun Sharma (Class XII, 2025 batch) who secured All India Rank 47 in JEE Advanced 2025. His dedication, the guidance of our faculty, and unwavering support from his family made this possible.', date: '2025-06-15', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=70', featured: true },
  { id: 2, category: 'Event', title: 'Annual Day Celebration – 28th March 2026', excerpt: 'Join us for our grand Annual Day celebration on 28th March 2026 at the school auditorium. This year\'s theme is "Roots and Wings" — celebrating our heritage while soaring towards tomorrow.', date: '2026-03-01', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=70', featured: true },
  { id: 3, category: 'News', title: 'Admissions Open for 2026-27 Academic Year', excerpt: 'Applications for the 2026-27 academic year are now open for all classes from Nursery to Class XII. Limited seats available. Apply online or visit the school office. Early applications are encouraged.', date: '2026-01-15', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70', featured: false },
  { id: 4, category: 'Achievement', title: 'School Wins National Green Schools Award for 3rd Year', excerpt: 'Akshara Hgh School has been awarded the prestigious National Green Schools Award for the third consecutive year, recognising our solar installations, water conservation, and organic farming initiatives.', date: '2025-12-10', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=70', featured: false },
  { id: 5, category: 'Event', title: 'Science Exhibition 2026 – Registrations Open', excerpt: 'The annual inter-school Science and Innovation Exhibition will be held on 15th April 2026. Students from Classes VI to XII are encouraged to participate and showcase their projects.', date: '2026-02-20', img: 'https://images.unsplash.com/photo-1532094349884-543559c10c2b?w=600&q=70', featured: false },
  { id: 6, category: 'Circular', title: 'Revised Fee Structure for 2026-27', excerpt: 'Parents are requested to note the revised fee structure for the upcoming academic year. Fee details have been updated on the school portal. Last date for fee submission: 31st May 2026.', date: '2026-02-01', img: null, featured: false },
  { id: 7, category: 'Achievement', title: 'U-14 Cricket Team Wins District Championship', excerpt: 'Congratulations to our Under-14 cricket team who emerged victorious in the District Level Cricket Championship 2025. The team went unbeaten through all 6 matches. Coach Mr. Santosh Kumar expressed his pride.', date: '2025-11-22', img: 'https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=600&q=70', featured: false },
  { id: 8, category: 'Holiday', title: 'Summer Break Schedule 2026', excerpt: 'The school will remain closed for Summer Break from 15th May 2026 to 31st May 2026. The new academic session for 2026-27 begins on 1st June 2026. Hostel reopening date: 29th May 2026.', date: '2026-03-10', img: null, featured: false },
  { id: 9, category: 'News', title: 'New Robotics & STEM Lab Inaugurated', excerpt: 'The state-of-the-art Robotics and STEM Lab was inaugurated on 10th January 2026 by our Chairman, Dr. R.C. Gupta. The lab is equipped with Arduino kits, 3D printers, VR headsets, and AI workstations.', date: '2026-01-10', img: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=70', featured: false },
];

const catColors = { News: '#1a3a5c', Event: '#3a5c1a', Achievement: '#d4af37', Circular: '#5c1a3a', Holiday: '#1a5c5c' };
const catBg = { News: '#e8f0f8', Event: '#e8f5ea', Achievement: '#fdf3e3', Circular: '#f8e8f0', Holiday: '#e8f5f5' };

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function News() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === 'All' ? NEWS_DATA : NEWS_DATA.filter(n => n.category === filter);
  const featured = NEWS_DATA.filter(n => n.featured);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>News & Events | Akshara Hgh School</title>
        <meta name="description" content="Latest news, events, achievements, and circulars from Akshara Hgh School." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › <span>News & Events</span></p>
          <h1>News & Events</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, marginTop: 12 }}>
            Stay updated with the latest happenings, achievements, events, and announcements from our school community.
          </p>
        </div>
      </div>

      <section className="section section--cream">
        <div className="container">
          {/* Featured stories */}
          <div className="news__featured">
            {featured.map((item, i) => (
              <motion.div
                key={item.id}
                className="news__featured-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item.img && (
                  <div className="news__featured-img">
                    <img src={item.img} alt={item.title} />
                    <div className="news__featured-img-overlay" />
                  </div>
                )}
                <div className="news__featured-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span className="badge" style={{ background: catBg[item.category], color: catColors[item.category] }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={12} /> {formatDate(item.date)}
                    </span>
                    <span className="badge badge-gold" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>Featured</span>
                  </div>
                  <h3 className="news__featured-title">{item.title}</h3>
                  <p className="news__featured-excerpt">{item.excerpt}</p>
                  <button className="news__read-more" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                    {expanded === item.id ? 'Show Less' : 'Read More'} <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filter + grid */}
          <div className="news__filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`news__filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="news__grid">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className="news__card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                layout
              >
                {item.img ? (
                  <div className="news__card-img">
                    <img src={item.img} alt={item.title} loading="lazy" />
                  </div>
                ) : (
                  <div className="news__card-img news__card-img--placeholder">
                    <span>{item.category[0]}</span>
                  </div>
                )}
                <div className="news__card-body">
                  <div className="news__card-meta">
                    <span className="badge" style={{ background: catBg[item.category], color: catColors[item.category], border: `1px solid ${catColors[item.category]}33` }}>
                      <Tag size={10} style={{ marginRight: 4 }} />{item.category}
                    </span>
                    <span className="news__card-date"><Calendar size={12} />{formatDate(item.date)}</span>
                  </div>
                  <h4 className="news__card-title">{item.title}</h4>
                  <p className="news__card-excerpt">{item.excerpt.substring(0, 120)}...</p>
                  <button className="news__read-more" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                    {expanded === item.id ? 'Show Less' : 'Read More'} <ArrowRight size={13} />
                  </button>
                  {expanded === item.id && (
                    <motion.p
                      className="news__card-full"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      {item.excerpt}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
