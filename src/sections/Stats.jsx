import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const Stats = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  // Refs for counter animations
  const uptimeCounterRef = useRef(null);
  const usersCounterRef = useRef(null);
  const encryptionCounterRef = useRef(null);

  // Animation for counting up when in view
  useEffect(() => {
    if (isInView) {
      // Uptime counter animation
      gsap.fromTo(
        uptimeCounterRef.current,
        { textContent: "0" },
        {
          duration: 2,
          textContent: "99.9",
          snap: { textContent: 0.1 },
          ease: "power2.out"
        }
      );
      
      // Users counter animation
      gsap.fromTo(
        usersCounterRef.current,
        { textContent: "0" },
        {
          duration: 2,
          textContent: "5",
          snap: { textContent: 1 },
          ease: "power2.out"
        }
      );
      
      // Encryption counter animation
      gsap.fromTo(
        encryptionCounterRef.current,
        { textContent: "0" },
        {
          duration: 2,
          textContent: "256",
          snap: { textContent: 1 },
          ease: "power2.out"
        }
      );
    }
  }, [isInView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={statsRef} className="py-20 bg-slate-950 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose-900 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-fuchsia-900 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          By the Numbers
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-800 text-center group hover:border-fuchsia-500 transition-all duration-300"
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <div className="mb-2 flex items-center justify-center">
              <span ref={uptimeCounterRef} className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400">
                99.9
              </span>
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400">%</span>
            </div>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Uptime reliability</p>
            <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-800 text-center group hover:border-fuchsia-500 transition-all duration-300"
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <div className="mb-2 flex items-center justify-center">
              <span ref={usersCounterRef} className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400">
                5
              </span>
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400">M+</span>
            </div>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Active users</p>
            <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-800 text-center group hover:border-fuchsia-500 transition-all duration-300"
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <div className="mb-2 flex items-center justify-center">
              <span ref={encryptionCounterRef} className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400">
                256
              </span>
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400">-bit</span>
            </div>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">End-to-end encryption</p>
            <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full"></div>
          </motion.div>
        </div>
        
        <div className="mt-16 text-center">
          <motion.p
            className="text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join millions of users who trust MishrazChat for secure, reliable, and private communications across the globe.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Stats;