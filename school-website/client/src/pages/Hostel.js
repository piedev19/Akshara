import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Wifi, BookOpen, Utensils, Dumbbell, Heart, Sun, Moon, User, Users } from 'lucide-react';
import { hostelAPI } from '../utils/api';
import './Hostel.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

const FACILITY_ICONS = {
  '24/7 Security': <Shield size={18} />, '24/7 CCTV': <Shield size={18} />,
  'Wi-Fi': <Wifi size={18} />, 'Study Hall': <BookOpen size={18} />,
  'Dining': <Utensils size={18} />, 'Indoor Games': <Dumbbell size={18} />,
  'Medical Room': <Heart size={18} />, 'Laundry': <Sun size={18} />,
  'Salon': <Sun size={18} />,
};

const FALLBACK = {
  boys: { capacity: 200, available: 45, fee: 4500, facilities: ['24/7 Security','Wi-Fi','Study Hall','Dining','Indoor Games','Medical Room','Laundry'], warden: 'Mr. Rajesh Kumar', contact: '+91 98765 43210' },
  girls: { capacity: 150, available: 30, fee: 4500, facilities: ['24/7 CCTV','Wi-Fi','Study Hall','Dining','Indoor Games','Medical Room','Salon','Laundry'], warden: 'Mrs. Sunita Sharma', contact: '+91 98765 43211' },
  rules: ['Mobile phones not permitted on weekdays','Visiting hours: Sundays 10 AM – 5 PM','Lights out: 10:30 PM','Mandatory study hours: 7 PM – 9 PM'],
  mealtimes: { breakfast: '7:00 AM – 8:00 AM', lunch: '12:30 PM – 1:30 PM', snacks: '4:30 PM – 5:00 PM', dinner: '7:30 PM – 8:30 PM' },
};

export default function Hostel() {
  const [info, setInfo] = useState(FALLBACK);
  const [activeWing, setActiveWing] = useState('boys');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    hostelAPI.getInfo()
      .then(res => { if (res.data) setInfo(res.data); })
      .catch(() => {});
  }, []);

  const wing = info[activeWing];
  const occupancyPct = Math.round(((wing.capacity - wing.available) / wing.capacity) * 100);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Hostel Facility | Vidya Vihar International School</title>
        <meta name="description" content="Safe, supervised hostel for boys and girls. Nutritious meals, study rooms, 24/7 CCTV, and a resident medical officer. A true home away from home." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › Life @ School › <span>Hostel</span></p>
          <h1>Hostel Facility</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, marginTop: 12 }}>
            A warm, safe, and structured environment where students grow in independence, discipline, and friendship — a true home away from home.
          </p>
        </div>
      </div>

      {/* Hero image strip */}
      <div className="hostel__img-strip">
        {[
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=70',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=70',
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=70',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=70',
        ].map((src, i) => (
          <div key={i} className="hostel__img-item">
            <img src={src} alt={`Hostel facility ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Wing selector + details */}
      <section className="section section--cream" ref={ref}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Accommodation</span>
            <h2>Separate Wings for<br /><em>Boys & Girls</em></h2>
            <div className="gold-divider" />
            <p className="subtitle">Both wings have dedicated wardens, 24/7 supervision, and all the facilities students need to thrive academically and personally.</p>
          </div>

          {/* Wing toggle */}
          <div className="hostel__wing-toggle">
            <button
              className={`hostel__wing-btn ${activeWing === 'boys' ? 'active' : ''}`}
              onClick={() => setActiveWing('boys')}
            >
              <User size={18} /> Boys Hostel
            </button>
            <button
              className={`hostel__wing-btn ${activeWing === 'girls' ? 'active' : ''}`}
              onClick={() => setActiveWing('girls')}
            >
              <Users size={18} /> Girls Hostel
            </button>
          </div>

          <motion.div
            key={activeWing}
            className="hostel__wing-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="hostel__wing-main">
              {/* Stats */}
              <div className="hostel__wing-stats">
                <div className="hostel__wing-stat">
                  <div className="hostel__wing-stat-val">{wing.capacity}</div>
                  <div className="hostel__wing-stat-label">Total Capacity</div>
                </div>
                <div className="hostel__wing-stat hostel__wing-stat--highlight">
                  <div className="hostel__wing-stat-val" style={{ color: wing.available > 20 ? 'var(--success)' : 'var(--warning)' }}>
                    {wing.available}
                  </div>
                  <div className="hostel__wing-stat-label">Seats Available</div>
                </div>
                <div className="hostel__wing-stat">
                  <div className="hostel__wing-stat-val">₹{wing.fee.toLocaleString()}</div>
                  <div className="hostel__wing-stat-label">Per Month</div>
                </div>
              </div>

              {/* Occupancy bar */}
              <div className="hostel__occupancy">
                <div className="hostel__occupancy-label">
                  <span>Current Occupancy</span>
                  <strong>{occupancyPct}% Filled</strong>
                </div>
                <div className="hostel__occupancy-bar">
                  <motion.div
                    className="hostel__occupancy-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${occupancyPct}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ background: occupancyPct > 80 ? 'var(--warning)' : 'var(--success)' }}
                  />
                </div>
                <p className="hostel__occupancy-note">
                  {wing.available > 20
                    ? `✅ ${wing.available} seats still available for 2026-27. Apply early to secure accommodation.`
                    : `⚠️ Only ${wing.available} seats remaining — admission closing soon!`}
                </p>
              </div>

              {/* Facilities */}
              <div className="hostel__facilities">
                <h4>Facilities Provided</h4>
                <div className="hostel__facilities-grid">
                  {wing.facilities.map((f, i) => (
                    <motion.div
                      key={i}
                      className="hostel__facility-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.06 }}
                    >
                      <span className="hostel__facility-icon">{FACILITY_ICONS[f] || <Shield size={18} />}</span>
                      {f}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Warden card */}
            <div className="hostel__wing-sidebar">
              <div className="hostel__warden-card">
                <div className="hostel__warden-avatar">
                  {activeWing === 'boys'
                    ? <img src="https://i.pravatar.cc/100?img=52" alt="Boys Warden" />
                    : <img src="https://i.pravatar.cc/100?img=44" alt="Girls Warden" />
                  }
                </div>
                <div className="hostel__warden-badge">{activeWing === 'boys' ? 'Boys' : 'Girls'} Warden</div>
                <h4>{wing.warden}</h4>
                <p>Available 24/7 for student welfare and parent communication</p>
                <a href={`tel:${wing.contact.replace(/\s/g, '')}`} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                  📞 {wing.contact}
                </a>
              </div>

              <div className="hostel__apply-card">
                <h4>Apply for Hostel</h4>
                <p>Hostel accommodation can be requested as part of your admission application.</p>
                <a href="/admissions" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  Apply via Admission Form
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meal schedule */}
      <section className="section section--white">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-header">
            <span className="section-eyebrow">Dining</span>
            <h2>Nutritionist-Planned<br /><em>Meal Schedule</em></h2>
            <div className="gold-divider" />
            <p className="subtitle">Every meal is freshly prepared, nutritionally balanced, and designed by a certified dietitian to support growing minds and bodies.</p>
          </div>
          <div className="hostel__meals">
            {Object.entries(info.mealtimes).map(([meal, time], i) => {
              const icons = { breakfast: <Sun size={22} />, lunch: <Utensils size={22} />, snacks: <Heart size={22} />, dinner: <Moon size={22} /> };
              const labels = { breakfast: 'Breakfast', lunch: 'Lunch', snacks: 'Evening Snacks', dinner: 'Dinner' };
              const menus = {
                breakfast: 'Idli / Poha / Paratha with Milk, Juice & Fruit',
                lunch: 'Rice, Dal, Sabzi, Roti, Salad & Buttermilk',
                snacks: 'Seasonal Fruit + Snacks (Samosa / Biscuits / Upma)',
                dinner: 'Chapati, Sabzi, Dal, Rice, Khichdi (rotating weekly)',
              };
              return (
                <motion.div
                  key={meal}
                  className="hostel__meal-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="hostel__meal-icon">{icons[meal]}</div>
                  <div className="hostel__meal-info">
                    <div className="hostel__meal-name">{labels[meal]}</div>
                    <div className="hostel__meal-time">{time}</div>
                    <div className="hostel__meal-menu">{menus[meal]}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="section section--dark">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-header">
            <span className="section-eyebrow">Hostel Life</span>
            <h2 style={{ color: 'var(--white)' }}>Rules &<br /><em style={{ color: 'var(--gold)' }}>Guidelines</em></h2>
            <div className="gold-divider" />
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>Our hostel rules are designed to create a disciplined, focused, and happy environment for all residents.</p>
          </div>
          <div className="hostel__rules">
            {info.rules.map((rule, i) => (
              <motion.div
                key={i}
                className="hostel__rule"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="hostel__rule-num">{String(i + 1).padStart(2, '0')}</div>
                <p>{rule}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
