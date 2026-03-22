import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
  { name: 'Suresh & Lakshmi Pillai', child: 'Parents of Aditya (Class X)', img: 'https://i.pravatar.cc/80?img=53', stars: 5, text: 'We enrolled Aditya in Akshara 6 years ago and it has been the best decision of our lives. The teachers here don\'t just teach — they mentor, they inspire, and they genuinely care about each child\'s progress. Aditya has grown not just academically but as a person.' },
  { name: 'Anjali Verma', child: 'Parent of Riya (Class VII)', img: 'https://i.pravatar.cc/80?img=46', stars: 5, text: 'The school\'s balanced approach to academics and extra-curricular activities is remarkable. Riya excels in her studies but also finds time for dance, badminton, and science club. The faculty here are exceptional and the campus is world-class.' },
  { name: 'Mohammed Riaz', child: 'Parent of Zainab (Class XII, Batch 2025)', img: 'https://i.pravatar.cc/80?img=54', stars: 5, text: 'Zainab secured admission to Delhi University\'s English Honours programme with a 97.6% score. The teachers went above and beyond — individual doubt-clearing sessions, career guidance, and moral support through every pressure point. Forever grateful.' },
  { name: 'Dr. Preethi Nair', child: 'Alumni – Class of 2018, now MBBS Student', img: 'https://i.pravatar.cc/80?img=47', stars: 5, text: 'Akshara gave me the discipline, the curiosity, and the confidence I needed to crack NEET. Looking back, every lab session, every project, every competition was building me up. I am what I am today because of this school.' },
  { name: 'Rajesh Krishnan', child: 'Parent of Rohan (Class VIII, Hostel)', img: 'https://i.pravatar.cc/80?img=55', stars: 5, text: 'We were nervous about putting our son in a hostel far from home, but the staff made the transition seamless. The hostel is clean, safe, and warm. Rohan has become more independent, disciplined, and confident. The daily updates from the warden put us completely at ease.' },
  { name: 'Kavitha & Ramana Murthy', child: 'Parents of twins in Class IV & IX', img: 'https://i.pravatar.cc/80?img=48', stars: 5, text: 'We have two children at very different stages and the school handles both brilliantly. Our younger one loves the playful, activity-based learning, and our older son is thriving with the challenging State curriculum. The school truly caters to every age group.' },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [auto]);

  const go = (dir) => {
    setAuto(false);
    setIdx(i => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="testimonials section section--white">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Parent & Alumni Voice</span>
          <h2>Hear It From<br /><em>Our Community</em></h2>
          <div className="gold-divider" />
        </div>

        <div className="testimonials__wrapper">
          <button className="testimonials__nav prev" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft size={22} /></button>

          <div className="testimonials__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="testimonials__card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className="testimonials__stars">
                  {[...Array(TESTIMONIALS[idx].stars)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <p className="testimonials__text">"{TESTIMONIALS[idx].text}"</p>
                <div className="testimonials__author">
                  <img src={TESTIMONIALS[idx].img} alt={TESTIMONIALS[idx].name} />
                  <div>
                    <div className="testimonials__name">{TESTIMONIALS[idx].name}</div>
                    <div className="testimonials__role">{TESTIMONIALS[idx].child}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="testimonials__nav next" onClick={() => go(1)} aria-label="Next"><ChevronRight size={22} /></button>
        </div>

        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === idx ? 'active' : ''}`}
              onClick={() => { setAuto(false); setIdx(i); }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
