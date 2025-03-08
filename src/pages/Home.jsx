import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Testimonial from '../sections/Testimonial';
import Stats from '../sections/Stats';
import Footer from '../layout/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();
  
  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      <Navbar onLoginClick={() => navigate('/login')} />
      
      <Hero 
        onLoginClick={() => navigate('/login')}
        onSignupClick={() => navigate('/register')}
      />
      
      <Features onGetStartedClick={() => navigate('/register')} />
      
      <Testimonial />
      
      <Stats />
      
      <Footer />
    </div>
  );
};

export default HomePage;