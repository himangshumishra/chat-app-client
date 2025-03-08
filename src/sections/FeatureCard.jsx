import React from 'react';

const FeatureCard = React.forwardRef(({ icon, title, description }, ref) => {
  return (
    <div ref={ref} className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-fuchsia-500 transition-all duration-300 group">
      <div className="bg-gradient-to-br from-rose-500 to-fuchsia-600 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-lg shadow-rose-500/20 group-hover:shadow-fuchsia-500/40 transition-all duration-300 transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-fuchsia-400 transition-colors duration-300">{title}</h3>
      <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{description}</p>
    </div>
  );
});

export default FeatureCard;