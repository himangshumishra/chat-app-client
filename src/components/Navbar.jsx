import { motion } from 'framer-motion';

const Navbar = ({ onLoginClick }) => {
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.nav 
      className="fixed w-full z-50 backdrop-blur-lg bg-slate-950/80 py-4"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full blur-md bg-rose-500 opacity-70"></div>
            <div className="relative bg-slate-950 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fuchsia-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <span className="text-white text-xl font-bold ml-2 tracking-tight">
            MishrazChat
          </span>
        </div>
        <motion.button 
          onClick={onLoginClick}
          className="relative px-5 py-2 overflow-hidden rounded-full group bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative">Get Started</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;