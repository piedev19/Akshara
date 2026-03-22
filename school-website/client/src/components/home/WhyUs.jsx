import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Microscope, Trophy, Bus, Home, Wifi, Shield, Music, Leaf } from 'lucide-react';
import './WhyUs.css';

const REASONS = [
  { icon: <Trophy size={28} />, title: 'Academic Excellence', desc: 'Consistently 100% board results with multiple state and national toppers. Our rigorous curriculum prepares students for IITs, AIIMS, and global universities.' },
  { icon: <Microscope size={28} />, title: 'World-Class Labs', desc: 'Fully equipped Physics, Chemistry, Biology, and Computer labs with the latest technology to make learning experiential and exciting.' },
  { icon: <Shield size={28} />, title: 'Safe & Secure Campus', desc: '24/7 CCTV surveillance, professional security staff, and a GPS-tracked transport fleet ensure total safety for every student.' },
  { icon: <Bus size={28} />, title: 'Transport Facility', desc: 'Door-to-door transport across 5 major routes covering all city zones. GPS-enabled buses with lady escort and first aid.' },
  { icon: <Home size={28} />, title: 'Hostel for Boys & Girls', desc: 'Separate, supervised hostels with nutritious meals, study rooms, sports, and a homely environment to help students thrive.' },
  { icon: <Music size={28} />, title: 'Co-Curricular Activities', desc: 'From classical music and dance to robotics and debate — over 40 clubs and activities nurture every unique talent.' },
  { icon: <Wifi size={28} />, title: 'Smart Classrooms', desc: 'Every classroom is equipped with interactive smartboards, high-speed internet, and digital learning resources to make lessons engaging.' },
  { icon: <Leaf size={28} />, title: 'Green & Eco Campus', desc: 'Lush 15-acre campus with an organic garden, solar panels, and environmental programmes that teach students to love the Earth.' },
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
            For over 28 years, Akshara has been shaping confident, compassionate, and capable individuals 
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
