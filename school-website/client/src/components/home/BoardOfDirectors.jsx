import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';
import './BoardOfDirectors.css';

const BOARD = [
  {
    name: 'Dr. Ramesh Chandra Gupta',
    role: 'Chairman & Founder',
    img: 'https://i.pravatar.cc/200?img=51',
    qualification: 'Ph.D. in Education Management, IIM Ahmedabad',
    message: 'Our mission from day one has been simple: to nurture every child\'s potential, to build character alongside intellect, and to send into the world young people who are confident, compassionate, and capable of making a difference.',
    since: '1998',
  },
  {
    name: 'Mrs. Savita Gupta',
    role: 'Co-Founder & Managing Trustee',
    img: 'https://i.pravatar.cc/200?img=44',
    qualification: 'M.Ed., MA in Child Psychology',
    message: 'A school is only as good as its teachers. We invest deeply in our faculty so that every student receives the personal attention, encouragement, and inspiration they need to flourish.',
    since: '1998',
  },
  {
    name: 'Mr. Vikram Singh Rathore',
    role: 'Director – Academics',
    img: 'https://i.pravatar.cc/200?img=52',
    qualification: 'M.Sc., B.Ed., 22 years in education',
    message: 'Academic rigor and joyful learning are not opposites — they are complementary. Our curriculum is designed to challenge young minds while celebrating curiosity and discovery every single day.',
    since: '2004',
  },
  {
    name: 'Dr. Meera Krishnamurthy',
    role: 'Director – Student Welfare',
    img: 'https://i.pravatar.cc/200?img=45',
    qualification: 'MBBS, Child & Adolescent Counsellor',
    message: 'The well-being of our students — mental, physical, and emotional — is at the heart of everything we do. Every child deserves to feel safe, seen, and supported in our school community.',
    since: '2010',
  },
];

export default function BoardOfDirectors() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="board section section--cream" id="board" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Leadership</span>
          <h2>Board of Directors &<br /><em>Management</em></h2>
          <div className="gold-divider" />
          <p className="subtitle">
            Guided by visionary leaders with decades of experience in education, our school's direction is defined 
            by a commitment to excellence, integrity, and the holistic development of every child.
          </p>
        </div>

        <div className="board__grid" ref={ref}>
          {BOARD.map((member, i) => (
            <motion.div
              key={i}
              className="board__card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="board__card-top">
                <div className="board__img-ring">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="board__card-meta">
                  <h3 className="board__name">{member.name}</h3>
                  <div className="board__role">{member.role}</div>
                  <div className="board__qual">{member.qualification}</div>
                  <div className="board__since">With the school since {member.since}</div>
                </div>
              </div>
              <div className="board__message">
                <Quote size={20} className="board__quote-icon" />
                <p>{member.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
