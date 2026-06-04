import { industriesData } from '../data/websiteData';
import LucideIcon from './LucideIcon';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import BackgroundVideo from './BackgroundVideo';

export default function Industries() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="industries" className="py-24 md:py-32 relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden border-t border-brand-teal/10">
      <BackgroundVideo src="/assets/industries.mp4" />

      {/* Decorative vectors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(196,145,52,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal-light/20">
            <Sparkles className="text-brand-gold w-3.5 h-3.5" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">Diverse Industries</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Empowering Global Markets
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-sans tracking-wide">
            We deliver targeted digital initiatives, KPO metrics, and BPO operations optimized for specific industry compliance guidelines.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {industriesData.map((ind) => (
            <motion.div
              id={`industry-card-${ind.id}`}
              key={ind.id}
              variants={itemVariants}
              className="p-6 rounded-2xl glossy-teal-card-interactive group flex flex-col justify-between min-h-[170px]"
            >
              <div className="space-y-4">
                {/* Icon box */}
                <div className="w-10 h-10 rounded-xl bg-brand-teal-deep/80 border border-brand-teal/30 flex items-center justify-center text-brand-teal-light group-hover:text-brand-gold group-hover:border-brand-gold/30 transition-all duration-300">
                  <LucideIcon name={ind.iconName} size={20} />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-brand-gold transition-colors duration-200">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-sans leading-relaxed group-hover:text-gray-300 transition-colors font-light">
                    {ind.description}
                  </p>
                </div>
              </div>

              {/* Little vector corner accent */}
              <div className="w-4 h-4 self-end mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
