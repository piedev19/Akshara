import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './FacilitiesShowcase.css';

const FACILITIES = [
  {
    id: 'labs',
    label: 'Science Labs',
    img: 'https://images.unsplash.com/photo-1532094349884-543559c10c2b?w=900&q=80',
    title: 'State-of-the-Art Science Laboratories',
    desc: 'Separate, fully equipped Physics, Chemistry, Biology, and Computer labs allow students to experience hands-on learning. Our labs feature the latest instruments and safety equipment to make science come alive.',
    highlights: ['5 fully equipped labs', 'Latest instruments & apparatus', 'Dedicated lab technicians', 'Safety-first protocols'],
  },
  {
    id: 'library',
    label: 'Digital Library',
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=80',
    title: 'A World-Class Digital Library',
    desc: 'Our library houses over 25,000 physical books and provides access to 10,000+ digital resources, journals, and e-books. High-speed Wi-Fi and dedicated reading areas make it the perfect place to learn and explore.',
    highlights: ['25,000+ physical books', '10,000+ digital resources', 'Dedicated reading halls', 'Research assistance'],
  },
  {
    id: 'sports',
    label: 'Sports Complex',
    img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
    title: 'Championship-Level Sports Facilities',
    desc: 'A sprawling sports complex with facilities for cricket, football, basketball, badminton, swimming, athletics, and more. Our students are trained by former national-level coaches to compete and win at the highest levels.',
    highlights: ['Olympic-size swimming pool', 'Indoor sports hall', 'Cricket & football grounds', 'Certified coaches'],
  },
  {
    id: 'auditorium',
    label: 'Auditorium',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80',
    title: '800-Seat AC Auditorium',
    desc: 'A purpose-built, air-conditioned auditorium seating 800 people serves as the cultural and performing arts hub. Equipped with professional lighting, acoustics, and sound systems, it hosts all annual events and competitions.',
    highlights: ['800-seat capacity', 'Professional acoustics', 'Green rooms & backstage', 'Regular cultural events'],
  },
  {
    id: 'hostel',
    label: 'Hostel',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80',
    title: 'Safe & Comfortable Hostel Life',
    desc: 'Separate, well-supervised hostels for boys and girls with 24/7 CCTV, nutritious meals, study halls, indoor games, and a resident medical officer ensure students feel at home away from home.',
    highlights: ['Separate boys & girls wings', '24/7 CCTV surveillance', 'Nutritionist-planned meals', 'Resident medical officer'],
  },
  {
    id: 'transport',
    label: 'Transport',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80',
    title: 'GPS-Enabled, Door-to-Door Transport',
    desc: 'A fleet of 20+ GPS-tracked buses covering 5 major city zones ensures safe, timely commutes. All buses are equipped with first aid kits, a lady escort, and are maintained to the highest road-safety standards.',
    highlights: ['20+ GPS-tracked buses', '5 city-wide zones', 'Lady escort on every bus', 'Real-time tracking app'],
  },
];

export default function FacilitiesShowcase() {
  const [active, setActive] = useState(FACILITIES[0]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="facilities section section--cream" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Campus Facilities</span>
          <h2>Everything Your Child Needs,<br /><em>Under One Roof</em></h2>
          <div className="gold-divider" />
          <p className="subtitle">From world-class labs to a championship swimming pool — our campus is built to inspire.</p>
        </div>

        <motion.div
          className="facilities__layout"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Tab list */}
          <div className="facilities__tabs">
            {FACILITIES.map(f => (
              <button
                key={f.id}
                className={`facilities__tab ${active.id === f.id ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f.label}
                {active.id === f.id && <motion.div className="facilities__tab-indicator" layoutId="tab-indicator" />}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="facilities__panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="facilities__img-wrapper">
                <img src={active.img} alt={active.title} />
                <div className="facilities__img-badge">{active.label}</div>
              </div>
              <div className="facilities__info">
                <h3>{active.title}</h3>
                <div className="gold-divider gold-divider--left" />
                <p>{active.desc}</p>
                <ul className="facilities__highlights">
                  {active.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="facilities__check">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
