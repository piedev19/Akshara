import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

const CATEGORIES = ['All', 'Campus', 'Sports', 'Events', 'Labs', 'Arts', 'Hostel'];

const PHOTOS = [
  { id: 1, cat: 'Campus', title: 'Main Building', src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=75', span: 'wide' },
  { id: 2, cat: 'Sports', title: 'Cricket Ground', src: 'https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=700&q=75' },
  { id: 3, cat: 'Events', title: 'Annual Day 2025', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=75' },
  { id: 4, cat: 'Labs', title: 'Science Laboratory', src: 'https://images.unsplash.com/photo-1532094349884-543559c10c2b?w=700&q=75' },
  { id: 5, cat: 'Campus', title: 'Library Wing', src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=700&q=75', span: 'tall' },
  { id: 6, cat: 'Arts', title: 'Music Room', src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=700&q=75' },
  { id: 7, cat: 'Sports', title: 'Swimming Pool', src: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=700&q=75' },
  { id: 8, cat: 'Events', title: 'Science Exhibition', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=75' },
  { id: 9, cat: 'Hostel', title: 'Hostel Common Room', src: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&q=75', span: 'wide' },
  { id: 10, cat: 'Campus', title: 'School Grounds', src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&q=75' },
  { id: 11, cat: 'Sports', title: 'Basketball Court', src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=75' },
  { id: 12, cat: 'Arts', title: 'Art & Craft Room', src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=75' },
  { id: 13, cat: 'Events', title: 'Sports Day 2025', src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=700&q=75' },
  { id: 14, cat: 'Labs', title: 'Computer Lab', src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=700&q=75' },
  { id: 15, cat: 'Campus', title: 'School Entrance', src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=75', span: 'tall' },
  { id: 16, cat: 'Events', title: 'Independence Day', src: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&q=75' },
  { id: 17, cat: 'Hostel', title: 'Hostel Dining Hall', src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=75' },
  { id: 18, cat: 'Arts', title: 'Dance Performance', src: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=700&q=75' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? PHOTOS : PHOTOS.filter(p => p.cat === filter);

  const openLightbox = (photo) => setLightbox(photo);
  const closeLightbox = () => setLightbox(null);

  const navLightbox = (dir) => {
    const currentIdx = filtered.findIndex(p => p.id === lightbox.id);
    const nextIdx = (currentIdx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[nextIdx]);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Photo Gallery | Akshara Hgh School</title>
        <meta name="description" content="Explore Akshara Hgh School through our photo gallery — campus, events, sports, labs, arts, and hostel." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › Life @ School › <span>Gallery</span></p>
          <h1>Photo Gallery</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, marginTop: 12 }}>
            A glimpse into the vibrant life at Akshara — moments of learning, celebration, and achievement.
          </p>
        </div>
      </div>

      <section className="section section--cream">
        <div className="container">
          {/* Filter bar */}
          <div className="gallery__filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`gallery__filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
                {filter === cat && <motion.div className="gallery__filter-pill" layoutId="gallery-pill" />}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <motion.div className="gallery__grid" layout>
            <AnimatePresence>
              {filtered.map((photo) => (
                <motion.div
                  key={photo.id}
                  className={`gallery__item ${photo.span ? `gallery__item--${photo.span}` : ''}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(photo)}
                >
                  <img src={photo.src} alt={photo.title} loading="lazy" />
                  <div className="gallery__item-overlay">
                    <div className="gallery__item-info">
                      <ZoomIn size={20} />
                      <span>{photo.title}</span>
                      <span className="gallery__item-cat">{photo.cat}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 32, fontSize: '0.9rem' }}>
            Showing {filtered.length} photos · Follow us on{' '}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--navy)', fontWeight: 600 }}>
              @aksharahighschool
            </a>{' '}
            for daily updates
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="gallery__lightbox-content"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="gallery__lightbox-close" onClick={closeLightbox}><X size={22} /></button>
              <img src={lightbox.src} alt={lightbox.title} />
              <div className="gallery__lightbox-caption">
                <span className="badge badge-gold">{lightbox.cat}</span>
                <h4>{lightbox.title}</h4>
              </div>
              <div className="gallery__lightbox-nav">
                <button onClick={() => navLightbox(-1)}>‹ Prev</button>
                <button onClick={() => navLightbox(1)}>Next ›</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
