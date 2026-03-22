import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, GraduationCap } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <motion.div
      className="notfound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet><title>Page Not Found | Akshara Hgh School</title></Helmet>

      <div className="notfound__content">
        <motion.div
          className="notfound__emblem"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <GraduationCap size={48} />
        </motion.div>

        <motion.div
          className="notfound__code"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for seems to have graduated early. Let us help you find what you need.
        </motion.p>

        <motion.div
          className="notfound__links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/" className="btn btn-primary btn-lg"><Home size={18} /> Go to Homepage</Link>
          <Link to="/admissions" className="btn btn-outline btn-lg">Apply for Admission</Link>
          <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
