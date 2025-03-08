import { motion } from 'framer-motion';

const Testimonial = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Curved background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute top-0 w-full h-20 bg-slate-900"></div>
        <svg className="absolute top-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{height: '160px'}}>
          <path fill="#0f172a" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-fuchsia-900 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-rose-900 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-fuchsia-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="text-2xl text-slate-300 font-light italic mb-6">
            MishrazChat has completely changed how our team communicates. The clean interface and reliable delivery make it our go-to messaging platform. The focus on privacy gives us peace of mind.
          </p>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center text-white font-medium mr-4">
              A
            </div>
            <div className="text-left">
              <div className="font-medium text-white">Arya Stark</div>
              <div className="text-sm text-slate-400">Product Manager at Winterfell</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;