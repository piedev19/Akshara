import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Eye, Heart, Star, Target } from 'lucide-react';
import BoardOfDirectors from '../components/home/BoardOfDirectors';
import './About.css';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0 },
};

const VALUES = [
  { icon: <Star size={24} />, title: 'Excellence', desc: 'We pursue the highest standards in everything — academics, sport, arts, and character.' },
  { icon: <Heart size={24} />, title: 'Compassion', desc: 'Empathy and kindness are at the core of every relationship in our community.' },
  { icon: <Target size={24} />, title: 'Integrity', desc: 'We act with honesty and courage, even when no one is watching.' },
  { icon: <Eye size={24} />, title: 'Curiosity', desc: 'We nurture a lifelong love of learning and the joy of asking "why?"' },
  { icon: <CheckCircle size={24} />, title: 'Responsibility', desc: 'We take ownership of our actions and our impact on the world around us.' },
  { icon: <Star size={24} />, title: 'Inclusivity', desc: 'We celebrate every background, ability, and perspective in our diverse community.' },
];

const FACULTY = [
  { name: 'Mrs. Anitha Subramaniam', subject: 'Principal', exp: '30 years', img: 'https://i.pravatar.cc/200?img=42', qual: 'M.Sc., M.Ed., CTET Qualified' },
  { name: 'Mr. Sanjay Kapoor', subject: 'Vice Principal & Mathematics', exp: '22 years', img: 'https://i.pravatar.cc/200?img=51', qual: 'M.Sc. Mathematics, B.Ed.' },
  { name: 'Dr. Nandini Rao', subject: 'Head – Science Dept.', exp: '18 years', img: 'https://i.pravatar.cc/200?img=44', qual: 'Ph.D. Chemistry, M.Ed.' },
  { name: 'Mr. Ashok Joshi', subject: 'Head – Humanities', exp: '20 years', img: 'https://i.pravatar.cc/200?img=52', qual: 'M.A. History, NET Qualified' },
  { name: 'Mrs. Deepa Varghese', subject: 'Head – English', exp: '16 years', img: 'https://i.pravatar.cc/200?img=45', qual: 'M.A. English Literature, B.Ed.' },
  { name: 'Mr. Harish Tiwari', subject: 'Head – Physical Education', exp: '14 years', img: 'https://i.pravatar.cc/200?img=53', qual: 'B.P.Ed., Diploma in Sports Science' },
  { name: 'Mrs. Fatima Shaikh', subject: 'Head – Primary School', exp: '19 years', img: 'https://i.pravatar.cc/200?img=47', qual: 'M.Ed., Montessori Certified' },
  { name: 'Mr. Ravi Shankar Pillai', subject: 'Head – Computer Science', exp: '12 years', img: 'https://i.pravatar.cc/200?img=54', qual: 'M.Tech. CS, CBSE Resource Person' },
];

const MILESTONES = [
  { year: '1998', event: 'School founded by Dr. R.C. Gupta with 120 students in Classes I–VII' },
  { year: '2002', event: 'CBSE affiliation granted; first Class X board exams with 100% results' },
  { year: '2007', event: 'New academic wing and sports complex inaugurated; strength grows to 1,200 students' },
  { year: '2010', event: 'Classes XI–XII added; first board year sees state topper in Commerce stream' },
  { year: '2015', event: 'Hostel facilities opened for boys and girls; digital library inaugurated' },
  { year: '2019', event: 'School recognized as "School of Excellence" by CBSE; strength crosses 2,500' },
  { year: '2022', event: 'Smart classrooms installed in all sections; robotics lab established' },
  { year: '2025', event: 'Awarded National Green Schools honour; 1,200+ students enrolled for 2025-26' },
];

function TimelineSection({ inView }) {
  return (
    <div className="about__timeline">
      {MILESTONES.map((m, i) => (
        <motion.div
          key={i}
          className="about__milestone"
          initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <div className="about__milestone-year">{m.year}</div>
          <div className="about__milestone-line"><div className="about__milestone-dot" /></div>
          <div className="about__milestone-text">{m.event}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function About() {
  const { ref: storyRef, inView: storyInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: valuesRef, inView: valuesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: facultyRef, inView: facultyInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>About Us | Vidya Vihar International School</title>
        <meta name="description" content="Learn about Vidya Vihar International School — our history since 1998, vision, values, experienced faculty, and the Board of Directors guiding our institution." />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <p className="breadcrumb">Home › <span>About Us</span></p>
          <h1>About Our School</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 550, marginTop: 12, fontSize: '1.05rem' }}>
            A legacy of 28 years, a community of 3,200+ students, and an unwavering commitment to nurturing the leaders of tomorrow.
          </p>
        </div>
      </div>

      {/* Story & Establishment */}
      <section className="section section--white" id="story" ref={storyRef}>
        <div className="container">
          <div className="about__story-layout">
            <motion.div
              className="about__story-img"
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80"
                alt="School campus"
              />
              <div className="about__story-badge">
                <div className="about__story-badge-number">28+</div>
                <div>Years of<br />Excellence</div>
              </div>
            </motion.div>
            <motion.div
              className="about__story-content"
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className="section-eyebrow" style={{ margin: 0 }}>Our Story</span>
              <h2 style={{ marginTop: 12 }}>Established in 1998,<br /><em>Built for the Future</em></h2>
              <div className="gold-divider gold-divider--left" />
              <p>
                AKSHARA HIGH SCHOOL KANKAPUR was established in 2013 and it is managed by the Pvt. Unaided. It is located in Rural area. 
                It is located in LAXMANCHANDA block of ADILABAD district of Telangana. The school consists of Grades from 1 to 10. 
                The school is Co-educational and it doesn't have an attached pre-primary section. The school is Not Applicable in nature 
                and is not using school building as a shift-school. English is the medium of instructions in this school. This school is 
                approachable by all weather road. In this school academic session starts in April.
              </p>
              <p style={{ marginTop: 16 }}>
                Starting with just 120 students and a handful of dedicated teachers, the school has grown into one of the
                region's most respected educational institutions — now serving over 3,200 students from Nursery to Class XII,
                with 150+ experienced faculty, and infrastructure that rivals the best in the country.
              </p>
              <p style={{ marginTop: 16 }}>
                CBSE affiliated since 2002, Vidya Vihar has consistently delivered 100% board results, produced state toppers,
                national Olympiad medallists, and alumni who have gone on to study at IITs, AIIMS, IIMs, and universities
                across the globe.
              </p>
              <div className="about__story-stats">
                {[['3,200+','Students'],['150+','Faculty'],['100%','Board Results'],['28+','Years']].map(([v, l]) => (
                  <div key={l} className="about__story-stat">
                    <div className="about__story-stat-val">{v}</div>
                    <div className="about__story-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--cream" id="timeline" ref={timelineRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Journey</span>
            <h2>A Timeline of<br /><em>Milestones</em></h2>
            <div className="gold-divider" />
          </div>
          <TimelineSection inView={timelineInView} />
        </div>
      </section>

      {/* Vision & Values */}
      <section className="section section--white" id="vision" ref={valuesRef}>
        <div className="container">
          <div className="about__vision-layout">
            <div className="about__vision-text">
              <span className="section-eyebrow" style={{ margin: 0 }}>Mission & Vision</span>
              <h2 style={{ marginTop: 12 }}>What We<br />Stand For</h2>
              <div className="gold-divider gold-divider--left" />
              <div className="about__vision-box about__vision-box--mission">
                <h4>Our Mission</h4>
                <p>To provide a nurturing, stimulating, and inclusive learning environment that empowers every student to achieve academic excellence, develop strong values, and become a responsible global citizen.</p>
              </div>
              <div className="about__vision-box about__vision-box--vision">
                <h4>Our Vision</h4>
                <p>To be recognised as a centre of transformative education — where curiosity is celebrated, character is built, and every child graduates ready to lead with wisdom and purpose.</p>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: 24, fontSize: '1.4rem' }}>Our Core Values</h3>
              <div className="about__values-grid" ref={valuesRef}>
                {VALUES.map((v, i) => (
                  <motion.div
                    key={i}
                    className="about__value-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={valuesInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <div className="about__value-icon">{v.icon}</div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="section section--cream" id="faculty" ref={facultyRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Faculty</span>
            <h2>Expert Educators,<br /><em>Dedicated Mentors</em></h2>
            <div className="gold-divider" />
            <p className="subtitle">
              Our faculty are not just teachers — they are mentors, guides, and role models. With an average experience
              of 18+ years, they bring passion and expertise to every classroom.
            </p>
          </div>
          <div className="about__faculty-grid">
            {FACULTY.map((f, i) => (
              <motion.div
                key={i}
                className="about__faculty-card"
                initial={{ opacity: 0, y: 30 }}
                animate={facultyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="about__faculty-img-wrap">
                  <img src={f.img} alt={f.name} />
                </div>
                <div className="about__faculty-info">
                  <h4>{f.name}</h4>
                  <div className="about__faculty-subject">{f.subject}</div>
                  <div className="about__faculty-qual">{f.qual}</div>
                  <div className="about__faculty-exp">{f.exp} experience</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 24, fontSize: '0.9rem' }}>
            + 142 more qualified and dedicated teaching and support staff
          </p>
        </div>
      </section>

      {/* Board of Directors */}
      <BoardOfDirectors />
    </motion.div>
  );
}
