import { useRef } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const Features = ({ onGetStartedClick }) => {
  const featuresRef = useRef(null);
  const featureItemsRef = useRef([]);

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "End-to-End Encryption",
      description: "Your conversations are fully encrypted. Only you and your recipient can read the messages. Not even we can access them."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Instant Messaging",
      description: "Experience lightning-fast message delivery with real-time typing indicators and read receipts."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
      title: "Distraction-Free",
      description: "No ads, no notifications, no clutter. Just a clean, focused interface that helps you communicate without distractions."
    }
  ];

  return (
    <section ref={featuresRef} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fuchsia-900 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-900 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Why Choose MishrazChat?
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              ref={el => featureItemsRef.current[index] = el}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.button
            onClick={onGetStartedClick}
            className="bg-gradient-to-r from-rose-500 to-fuchsia-500 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Messaging Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Features;