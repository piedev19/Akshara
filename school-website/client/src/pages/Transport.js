import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Clock, Shield, Wifi, Phone, AlertCircle, Bus, CheckCircle } from 'lucide-react';
import { transportAPI } from '../utils/api';
import './Transport.css';

const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };

const FEATURES = [
  { icon: <Shield size={22} />, title: 'GPS Tracked', desc: 'Every bus is tracked in real-time. Parents can monitor the location of their child\'s bus at any time via our mobile app.' },
  { icon: <Wifi size={22} />, title: 'Live Updates', desc: 'Receive SMS/WhatsApp alerts when the bus departs, is nearby, and when your child boards or alights.' },
  { icon: <Shield size={22} />, title: 'Lady Escort', desc: 'A trained lady escort accompanies students on every route to ensure comfort and safety throughout the journey.' },
  { icon: <AlertCircle size={22} />, title: 'First Aid Ready', desc: 'Every bus carries a first aid kit and the driver is trained in basic emergency response for student safety.' },
  { icon: <Bus size={22} />, title: 'CCTV On-Board', desc: 'All buses are equipped with CCTV cameras for continuous monitoring. Footage is reviewed regularly by the school.' },
  { icon: <CheckCircle size={22} />, title: 'Regular Servicing', desc: 'All vehicles undergo mandatory monthly maintenance checks and annual fitness certification to ensure roadworthiness.' },
];

const FALLBACK_ROUTES = [
  { id: 1, routeName: 'Route A – North Zone', stops: ['Railway Station', 'Civil Lines', 'Sector 12', 'School'], timing: '7:15 AM', fee: 1800 },
  { id: 2, routeName: 'Route B – South Zone', stops: ['Bus Stand', 'Market Square', 'Green Park', 'School'], timing: '7:30 AM', fee: 1800 },
  { id: 3, routeName: 'Route C – East Zone', stops: ['Airport Road', 'IT Hub', 'Lakeside', 'School'], timing: '7:20 AM', fee: 2000 },
  { id: 4, routeName: 'Route D – West Zone', stops: ['Mall Road', 'University Area', 'Hill View', 'School'], timing: '7:25 AM', fee: 2000 },
  { id: 5, routeName: 'Route E – Central Zone', stops: ['City Center', 'Collector Office', 'Park Colony', 'School'], timing: '7:40 AM', fee: 1600 },
];

export default function Transport() {
  const [routes, setRoutes] = useState(FALLBACK_ROUTES);
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    transportAPI.getRoutes()
      .then(res => { if (res.data?.length) setRoutes(res.data); })
      .catch(() => {});
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Transport Facility | Akshara High School</title>
        <meta name="description" content="Safe, GPS-tracked school transport covering 5 city zones. Lady escort, CCTV, and real-time tracking ensure your child's safety every day." />
      </Helmet>

      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › Life @ School › <span>Transport</span></p>
          <h1>Transport Facility</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, marginTop: 12 }}>
            Safe, reliable, GPS-tracked school buses covering all major city zones — so your child's journey to school is as worry-free as their day at school.
          </p>
        </div>
      </div>

      {/* Feature highlights */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Safety First</span>
            <h2>Why Parents Trust<br /><em>Our Transport</em></h2>
            <div className="gold-divider" />
          </div>
          <div className="transport__features" ref={ref}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                className="transport__feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="transport__feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Route explorer */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Bus Routes 2026-27</span>
            <h2>Find Your<br /><em>Nearest Route</em></h2>
            <div className="gold-divider" />
            <p className="subtitle">We cover 5 major zones across the city. Click on a route to see all stops and timings.</p>
          </div>

          <div className="transport__routes-layout">
            {/* Route tabs */}
            <div className="transport__route-list">
              {routes.map((r, i) => (
                <button
                  key={r.id}
                  className={`transport__route-btn ${active === i ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <div className="transport__route-btn-icon">
                    <Bus size={18} />
                  </div>
                  <div className="transport__route-btn-info">
                    <span className="transport__route-name">{r.routeName}</span>
                    <span className="transport__route-meta">{r.stops.length} stops · ₹{r.fee}/month</span>
                  </div>
                  {active === i && <div className="transport__route-arrow">›</div>}
                </button>
              ))}
            </div>

            {/* Route detail */}
            <motion.div
              key={active}
              className="transport__route-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="transport__route-header">
                <div>
                  <h3>{routes[active].routeName}</h3>
                  <div className="transport__route-badges">
                    <span className="badge badge-gold">Departure: {routes[active].timing}</span>
                    <span className="badge badge-navy">₹{routes[active].fee} / month</span>
                  </div>
                </div>
              </div>

              <div className="transport__stops">
                <h4 style={{ marginBottom: 16, color: 'var(--navy)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Route Stops</h4>
                <div className="transport__stops-list">
                  {routes[active].stops.map((stop, i) => (
                    <div key={i} className={`transport__stop ${i === routes[active].stops.length - 1 ? 'last' : ''}`}>
                      <div className="transport__stop-marker">
                        {i === routes[active].stops.length - 1
                          ? <div className="transport__stop-dot transport__stop-dot--school"><MapPin size={14} /></div>
                          : <div className="transport__stop-dot">{i + 1}</div>
                        }
                        {i < routes[active].stops.length - 1 && <div className="transport__stop-line" />}
                      </div>
                      <div className="transport__stop-info">
                        <span className={`transport__stop-name ${i === routes[active].stops.length - 1 ? 'school' : ''}`}>{stop}</span>
                        {i === 0 && <span className="transport__stop-tag">First Pickup</span>}
                        {i === routes[active].stops.length - 1 && <span className="transport__stop-tag transport__stop-tag--school">Destination</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="transport__route-info-box">
                <div className="transport__route-info-item">
                  <Clock size={16} />
                  <div>
                    <strong>Morning Pickup</strong>
                    <span>Bus departs first stop at {routes[active].timing}</span>
                  </div>
                </div>
                <div className="transport__route-info-item">
                  <Clock size={16} />
                  <div>
                    <strong>Afternoon Drop</strong>
                    <span>School dispersal at 3:30 PM · Home by ~4:30 PM</span>
                  </div>
                </div>
                <div className="transport__route-info-item">
                  <Phone size={16} />
                  <div>
                    <strong>Route Coordinator</strong>
                    <span>+91 98765 4{3200 + active} (available 7AM–5PM)</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <a href="/admissions" className="btn btn-primary">Register for Transport in Admission Form</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fee table */}
      <section className="section section--white">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header">
            <span className="section-eyebrow">Transport Fees</span>
            <h2>Simple,<br /><em>Transparent Pricing</em></h2>
            <div className="gold-divider" />
          </div>
          <div className="transport__fee-table">
            <div className="transport__fee-header">
              <span>Zone / Route</span>
              <span>Distance (approx.)</span>
              <span>Monthly Fee</span>
              <span>Annual Fee</span>
            </div>
            {[
              { zone: 'Central Zone (Route E)', dist: 'Up to 5 km', monthly: 1600, annual: 16000 },
              { zone: 'North / South Zone (A & B)', dist: '5–10 km', monthly: 1800, annual: 18000 },
              { zone: 'East / West Zone (C & D)', dist: '10–15 km', monthly: 2000, annual: 20000 },
            ].map((row, i) => (
              <div key={i} className="transport__fee-row">
                <span>{row.zone}</span>
                <span>{row.dist}</span>
                <span className="transport__fee-price">₹{row.monthly.toLocaleString()}</span>
                <span className="transport__fee-price">₹{row.annual.toLocaleString()}</span>
              </div>
            ))}
            <div className="transport__fee-note">
              * Fees include one-way commute (morning pick-up and afternoon drop). Annual payment attracts 8% discount.
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
