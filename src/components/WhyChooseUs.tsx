import { ShieldCheck, Clock, RefreshCw, MessageSquare, Handshake, Heart, Award } from 'lucide-react';
import { chooseUsFactors } from '../data/websiteData';
import { motion } from 'motion/react';
import BackgroundVideo from './BackgroundVideo';

export default function WhyChooseUs() {
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
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  // Assign clean icons to each index of chooseUsFactors
  const iconsMap = [
    <Award className="text-brand-gold shrink-0 mt-1" size={20} />,
    <Heart className="text-brand-gold shrink-0 mt-1" size={20} />,
    <RefreshCw className="text-brand-gold shrink-0 mt-1" size={20} />,
    <ShieldCheck className="text-brand-gold shrink-0 mt-1" size={20} />,
    <MessageSquare className="text-brand-gold shrink-0 mt-1" size={20} />,
    <Clock className="text-brand-gold shrink-0 mt-1" size={20} />,
    <Handshake className="text-brand-gold shrink-0 mt-1" size={20} />,
  ];

  return (
    <section id="why-choose-us" className="py-24 md:py-32 relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden border-t border-brand-teal/20">
      <BackgroundVideo src="/assets/why.mp4" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Core title and split grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Highlight Display card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal-light/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">Value Proposition</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                Designed to Accelerate <br />
                <span className="text-brand-gold">Global Productivity</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 font-sans font-light leading-relaxed">
                We empower organizations with the technology resources, business insight, and operational bandwidth to scale with minimal Friction.
              </p>
            </div>

            {/* Static Badge Card */}
            <div className="p-8 rounded-2xl glossy-teal-card relative overflow-hidden shadow-xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-2xl" />
              <div className="text-brand-gold font-display font-medium text-xs tracking-widest uppercase mb-4 font-mono">
                Corporate Governance
              </div>
              <p className="text-white text-lg font-display font-semibold leading-snug mb-4">
                "Our business structure enables you to maximize bottom-line cost centers without compromising deliverables or deadlines."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-teal-deep border border-brand-gold/20 flex items-center justify-center font-bold text-brand-gold text-xs">
                  KT
                </div>
                <div>
                  <span className="block text-white text-xs font-display font-bold tracking-tight">Kirubin Technologies, Inc.</span>
                  <span className="block text-gray-400 text-[10px] font-mono tracking-wider">GLOBAL OUTSOURCING LEADERS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The 7 reasons */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-6"
            >
              {chooseUsFactors.map((factor, index) => (
                <motion.div
                  id={`choose-factor-${index}`}
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4 p-5 rounded-xl glossy-teal-card-interactive group"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-teal-deep/80 border border-brand-teal/30 flex items-center justify-center shrink-0">
                    {iconsMap[index]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-brand-gold transition-colors duration-200">
                      {factor.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed font-sans font-light">
                      {factor.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
