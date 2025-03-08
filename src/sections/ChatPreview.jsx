import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const ChatPreview = () => {
  const chatPreviewRef = useRef(null);
  const messagesRef = useRef([]);
  
  // Animate messages to appear sequentially
  useEffect(() => {
    const messages = messagesRef.current.filter(msg => msg !== null);
    
    const tl = gsap.timeline({ delay: 1 });
    
    messages.forEach((msg, index) => {
      tl.to(msg, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        ease: 'power2.out'
      }, index * 0.8); // Stagger the animations
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <motion.div 
      ref={chatPreviewRef}
      className="w-full md:w-1/2 mt-16 md:mt-0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.4, 
        duration: 0.8, 
        type: "spring", 
        stiffness: 100 
      }}
    >
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-600 rounded-full filter blur-3xl opacity-20"></div>
        
        {/* Card */}
        <div className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-medium">
                M
              </div>
              <div className="ml-3">
                <div className="font-medium">MishrazChat</div>
                <div className="flex items-center text-xs text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                  Online
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="p-4 h-72 bg-slate-900 overflow-hidden">
            <div ref={el => messagesRef.current[0] = el} className="flex justify-start mb-4 opacity-0 translate-y-2">
              <div className="bg-slate-800 rounded-2xl rounded-tl-none py-2 px-4 text-white text-sm max-w-xs">
                <p>Hey there, welcome to MishrazChat! 👋</p>
              </div>
            </div>
            <div ref={el => messagesRef.current[1] = el} className="flex justify-start mb-4 opacity-0 translate-y-2">
              <div className="bg-slate-800 rounded-2xl rounded-tl-none py-2 px-4 text-white text-sm max-w-xs">
                <p>Our chat is end-to-end encrypted for maximum privacy.</p>
              </div>
            </div>
            <div ref={el => messagesRef.current[2] = el} className="flex justify-end mb-4 opacity-0 translate-y-2">
              <div className="bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-2xl rounded-tr-none py-2 px-4 text-white text-sm max-w-xs">
                <p>Sounds great! How do I start?</p>
              </div>
            </div>
            <div ref={el => messagesRef.current[3] = el} className="flex justify-start opacity-0 translate-y-2">
              <div className="bg-slate-800 rounded-2xl rounded-tl-none py-2 px-4 text-white text-sm max-w-xs">
                <p>Just click "Get Started" above! 🚀</p>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800">
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-slate-800 border border-slate-700 rounded-l-full py-2 px-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors duration-200"
                disabled
              />
              <button className="bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white rounded-r-full px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPreview;