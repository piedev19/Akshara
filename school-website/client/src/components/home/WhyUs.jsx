import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Microscope, Trophy, Bus, Home, Wifi, Shield, Music, Leaf } from 'lucide-react';
import './WhyUs.css';

const REASONS = [
  { icon: <Trophy size={13} />, title: 'Academic Excellence', desc: 'Consistently 100% board results with multiple state and national toppers. Our rigorous curriculum prepares students for IITs, and global universities.' },
  { icon: <Shield size={13} />, title: 'Safe & Secure Campus', desc: '24/7 CCTV surveillance, professional security staff, and a GPS-tracked transport fleet ensure total safety for every student.' },
  { icon: <Bus size={13} />, title: 'Transport Facility', desc: 'Door-to-door transport across 5 major routes covering all city zones. GPS-enabled buses with lady escort and first aid.' },
  { icon: <Home size={13} />, title: 'Hostel for Boys & Girls', desc: 'Separate, supervised hostels with nutritious meals, study rooms, sports, and a homely environment to help students thrive.' },
  { icon: <Music size={13} />, title: 'Co-Curricular Activities', desc: 'From classical music and dance to robotics and debate — over 5+ clubs and activities nurture every unique talent.' },
  { icon: <Leaf size={13} />, title: 'Green & Eco Campus', desc: 'Lush 3-acre campus with an organic garden, solar panels, and environmental programmes that teach students to love the Earth.' },
];

export default function WhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="why-us section section--white" id="why-us">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Why Choose Us</span>
          <h2>An Education That Goes<br /><em>Beyond the Textbook</em></h2>
          <div className="gold-divider" />
          <p className="subtitle">
            For over 13 years, Akshara has been shaping confident, compassionate, and capable individuals 
            through an education that nurtures the whole child.
          </p>
        </div>

        <div ref={ref} className="why-us__grid">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              className="why-us__card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="why-us__icon">{reason.icon}</div>
              <h3 className="why-us__title">{reason.title}</h3>
              <p className="why-us__desc">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
