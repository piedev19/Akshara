import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import WhyUs from '../components/home/WhyUs';
import QuickAdmission from '../components/home/QuickAdmission';
import BoardOfDirectors from '../components/home/BoardOfDirectors';
import Testimonials from '../components/home/Testimonials';
import NewsStrip from '../components/home/NewsStrip';
import FacilitiesShowcase from '../components/home/FacilitiesShowcase';
import AchieversPreview from '../components/home/AchieversPreview';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Akshara Hgh School | Excellence in Education | Admissions Open 2026-27</title>
        <meta name="description" content="Akshara Hgh School – State affiliated school offering world-class education from Nursery to Class 12. Admissions open for 2026-27. Transport & Hostel available." />
        <meta property="og:title" content="Akshara Hgh School | Admissions Open 2026-27" />
      </Helmet>
      <Hero />
      <NewsStrip />
      <WhyUs />
      <FacilitiesShowcase />
      <AchieversPreview />
      <QuickAdmission />
      <BoardOfDirectors />
      <Testimonials />
    </motion.div>
  );
}
