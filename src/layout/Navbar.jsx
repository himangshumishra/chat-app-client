import { useRef } from 'react';
import { motion } from 'framer-motion';
import ChatPreview from './ChatPreview';

const Hero = ({ onLoginClick, onSignupClick }) => {
  const heroRef = useRef(null);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen pt-32 pb-20 flex items-center relative bg-slate-950"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-fuchsia-900/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-rose-900/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-full md:w-1/2 md:pr-12">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-400 to-purple-400 leading-tight">
              Connect instantly with friends & colleagues
            </h1>
            <p className="hero-tagline mt-6 text-slate-300 text-lg md:text-xl max-w-2xl">
              A simple, fast and secure way to message in real-time. No distractions, no ads, just pure communication with end-to-end encryption.
            </p>
            <div className="hero-buttons mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-rose-500 to-fuchsia-500 px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={onSignupClick}
                className="border border-fuchsia-500 bg-transparent hover:bg-fuchsia-950/50 px-8 py-3 rounded-full font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Account
              </motion.button>
            </div>
          </div>
          
          {/* Chat Preview Card */}
          <ChatPreview />
        </div>
      </div>
    </section>
  );
};

export default Hero;