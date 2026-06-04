import { engagementModelSteps } from '../data/websiteData';
import { ArrowRight, HelpCircle, CheckCircle, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import BackgroundVideo from './BackgroundVideo';

export default function EngagementModel() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="engagement-model" className="py-24 md:py-32 relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden border-t border-neutral-900">
      <BackgroundVideo src="/assets/engagement.mp4" />

      {/* Decorative timeline graphic elements */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800 hidden lg:block pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111115]/85 border border-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">How We Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Our Collaboration Journey
          </h2>
          <p className="text-base text-gray-400 font-sans">
            A transparent, agile roadmap designed to align resources, optimize operational frameworks, and foster long-term global growth.
          </p>
        </div>

        {/* Steps container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {engagementModelSteps.map((item, index) => {
            const isLast = index === engagementModelSteps.length - 1;
            return (
              <motion.div
                id={`engagement-step-${item.step}`}
                key={item.step}
                variants={itemVariants}
                className="p-6 rounded-2xl glossy-teal-card-interactive relative flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  {/* Step bubble */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-[#222222] flex items-center justify-center font-display font-mono font-bold text-sm text-brand-gold shadow-md">
                      0{item.step}
                    </div>
                    
                    {!isLast && (
                      <div className="text-neutral-500 hidden lg:block transform translate-x-4">
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </div>

                  {/* Copy */}
                  <div className="space-y-2">
                    <h3 className="font-display text-sm font-bold text-white tracking-tight leading-tight group-hover:text-brand-gold min-h-[36px]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-sans leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Foot indicators */}
                <div className="mt-6 flex items-center gap-1 text-[9px] font-mono text-gray-500 uppercase tracking-widest font-semibold">
                  <span>Phase</span> 
                  <span className="text-brand-gold">0{item.step}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
