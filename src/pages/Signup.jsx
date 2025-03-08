import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../layout/Footer';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    
    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="relative w-full max-w-md px-6">
          {/* Background glow effect */}
          <div className="absolute -top-10 right-1/4 w-40 h-40 bg-fuchsia-600 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 left-1/4 w-40 h-40 bg-rose-600 rounded-full filter blur-3xl opacity-20"></div>
          
          {/* Card */}
          <motion.div 
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-500">
                Create Account
              </h1>
              <p className="text-slate-400 mt-2">Join MishrazChat today</p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-200 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                  Password
                </label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors duration-200"
                  placeholder="Create a password (6+ characters)"
                  required
                  minLength={6}
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-fuchsia-500 py-3 rounded-lg font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
              
              <div className="mt-6 text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-fuchsia-400 hover:text-fuchsia-300">
                  Sign in
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;