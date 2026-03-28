import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingAdmission from './components/common/FloatingAdmission';
import Loader from './components/common/Loader';
import AdminAdmissions from './pages/AdminAdmissions';

import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Contact = lazy(() => import('./pages/Contact'));
const Transport = lazy(() => import('./pages/Transport'));
const Hostel = lazy(() => import('./pages/Hostel'));
//const Gallery = lazy(() => import('./pages/Gallery'));
//const News = lazy(() => import('./pages/News'));
const AdmissionStatus = lazy(() => import('./pages/AdmissionStatus'));
const NotFound = lazy(() => import('./pages/NotFound'));



function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/hostel" element={<Hostel />} />
              {/*<Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />*/}
              <Route path="/admission-status" element={<AdmissionStatus />} />
              <Route path="*" element={<NotFound />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/admissions"
                element={
                  <ProtectedRoute>
                    <AdminAdmissions />
                  </ProtectedRoute>
                }
              />


            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <FloatingAdmission />
    </>
  );
}

export default App;
