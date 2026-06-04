import React from 'react';
import { Target, Eye, Globe2, Building2, MapPin, Flag } from 'lucide-react';
import { motion } from 'motion/react';
import BackgroundVideo from './BackgroundVideo';

export default function AboutUs() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about-us" className="py-24 md:py-32 relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      {/* Background looping board/tech visual */}
      <BackgroundVideo src="/assets/about.mp4" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Core Strategic Pitch */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">About Kirubin</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none uppercase">
                Accelerating Growth. <br />
                <span className="text-brand-gold">
                  Embracing Digital Excellence.
                </span>
              </h2>
            </motion.div>

            {/* User Requested Narrative Blocks */}
            <motion.div variants={itemVariants} className="space-y-6 text-gray-300 font-sans text-base md:text-lg leading-relaxed font-light">
              <p className="border-l-3 border-brand-gold pl-4 py-1 font-medium text-white/95">
                Kirubin Technologies is a next-generation Information Technology (IT), IT Enabled Services (ITES), Business Process Outsourcing (BPO), and Knowledge Process Outsourcing (KPO) company dedicated to helping organizations accelerate growth, improve operational efficiency, and embrace digital transformation.
              </p>
              
              <p>
                Founded in 2026, Kirubin Technologies combines technology, talent, and innovation to deliver scalable solutions for businesses across industries. With a global delivery approach and a strong focus on automation, digitalization, and customer success, we enable organizations to streamline operations, reduce costs, and achieve measurable business outcomes.
              </p>

              <p>
                To better serve our international clients, Kirubin Technologies operates through its U.S.-based LLC, providing a strong local presence for customer engagement, business operations, and strategic partnerships across North America. Our offshore delivery center in Chennai, India, serves as the backbone of our service delivery model, offering access to highly skilled technology professionals, business process specialists, and domain experts.
              </p>

              <p>
                This dual-shore operating model enables us to deliver cost-effective, scalable, and high-quality solutions while maintaining seamless collaboration, faster turnaround times, and round-the-clock support for clients worldwide. By combining global business reach with offshore delivery excellence, Kirubin Technologies helps organizations achieve greater efficiency, agility, and sustainable growth.
              </p>
            </motion.div>


          </div>

          {/* Right Column: Mission and Vision Cards */}
          <div className="lg:col-span-5 space-y-6 lg:pt-16">
            {/* Mission Card */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl glossy-teal-card-interactive"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center mb-6 border border-brand-gold/20">
                <Target className="text-brand-gold" size={24} />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white tracking-widest uppercase mb-3">
                Our Mission
              </h3>
              
              <p className="text-base text-gray-300 leading-relaxed font-sans font-light">
                To empower businesses through innovative technology solutions, efficient business processes, and knowledge-driven services that accelerate growth, improve productivity, and create sustainable value.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl glossy-teal-card-interactive"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center mb-6 border border-brand-gold/20">
                <Eye className="text-brand-gold" size={24} />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white tracking-widest uppercase mb-3">
                Our Vision
              </h3>
              
              <p className="text-base text-gray-300 leading-relaxed font-sans font-light">
                To become a trusted global partner for organizations seeking digital transformation, operational excellence, and scalable offshore services.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
