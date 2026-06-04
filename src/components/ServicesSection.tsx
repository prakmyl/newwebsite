import { useState } from 'react';
import { servicesData } from '../data/websiteData';
import LucideIcon from './LucideIcon';
import { Check, ArrowRight, UserPlus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BackgroundVideo from './BackgroundVideo';

export default function ServicesSection() {
  const [activeTabId, setActiveTabId] = useState(servicesData[0].id);

  const activeService = servicesData.find((s) => s.id === activeTabId) || servicesData[0];

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
    const element = document.getElementById('services-viewport');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden border-t border-neutral-900">
      <BackgroundVideo src="/assets/download.mp4" />

      {/* Background patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-[radial-gradient(circle_at_center,rgba(198,166,103,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111115]/80 border border-neutral-800">
            <Sparkles className="text-brand-gold w-3.5 h-3.5 animate-spin-slow" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">Our Expertise</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Building Smarter Solutions <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-gold via-brand-gold-light to-[#f5f5f5]">
              Across Modern Workflows
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-sans tracking-wide">
            Kirubin Technologies delivers precise operational capabilities. Tap on the divisions below to explore our sub-services and business benefits.
          </p>
        </div>

        {/* Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Tabs Navigation (Left Column) */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[580px] lg:overflow-y-auto pr-1">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest px-3 mb-2 font-semibold">
              Business Divisions
            </div>
            
            {/* Desktop and Mobile wrapper */}
            <div className="flex flex-row overflow-x-auto pb-4 gap-2 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:gap-2.5 scrollbar-thin scrollbar-thumb-brand-teal/20">
              {servicesData.map((svc) => {
                const isActive = svc.id === activeTabId;
                return (
                  <button
                    id={`svc-tab-${svc.id}`}
                    key={svc.id}
                    onClick={() => handleTabChange(svc.id)}
                    className={`flex items-center gap-4 text-left px-5 py-4 rounded-xl border transition-all duration-300 group cursor-pointer shrink-0 lg:shrink ${
                      isActive
                        ? 'glossy-teal-card border-brand-gold text-white shadow-xl scale-102 font-medium'
                        : 'bg-brand-teal-dark/30 border-brand-teal/25 hover:border-brand-teal-light text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#031B1D] text-brand-gold border border-brand-gold/30' : 'bg-brand-teal-deep/80 text-brand-gold/70 group-hover:text-brand-gold'
                    }`}>
                      <LucideIcon name={svc.iconName} size={18} />
                    </div>
                    <div className="flex-1 pr-2">
                       <div className="text-[10px] uppercase font-mono tracking-widest leading-none text-gray-400 mb-1 group-hover:text-brand-gold transition-colors font-semibold">
                        Division 0{svc.number}
                      </div>
                      <div className="font-display text-sm leading-tight font-bold tracking-tight">
                        {svc.title}
                      </div>
                    </div>
                    <ArrowRight size={14} className={`hidden lg:block transition-transform duration-300 ${
                      isActive ? 'translate-x-0 opacity-100 text-brand-gold' : '-translate-x-2 opacity-0 group-hover:opacity-60 group-hover:translate-x-0'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Viewport (Right Column) */}
          <div id="services-viewport" className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glossy-teal-card rounded-2xl p-6 md:p-10 shadow-2xl relative"
              >
                {/* Floating Division Indicator */}
                <div className="absolute top-6 right-6 font-mono text-5xl md:text-7xl font-black text-brand-gold/[0.04] select-none">
                  0{activeService.number}
                </div>

                {/* Title Segment */}
                <div className="space-y-3 max-w-xl mb-8">
                  <div className="flex items-center gap-3 text-brand-gold font-mono text-xs uppercase tracking-wider font-semibold">
                    <LucideIcon name={activeService.iconName} size={16} />
                    {activeService.title} Division
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
                    {activeService.tagline}
                  </h3>
                  <p className="text-base md:text-lg text-gray-300 font-sans leading-relaxed font-light">
                    {activeService.description}
                  </p>
                </div>

                {/* Sub-Services Block */}
                <div className="space-y-4 mb-10">
                  <h4 className="text-xs uppercase font-mono text-gray-400 tracking-wider font-semibold">
                    Core Capabilities Include:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeService.subServices.map((sub, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-xl bg-brand-teal-dark/40 border border-brand-teal-light/25 hover:border-brand-gold/30 hover:bg-brand-teal-light/20 transition-all group glossy-teal-card-interactive"
                      >
                        <h5 className="font-display text-sm font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">
                          {sub.name}
                        </h5>
                        <p className="text-sm text-gray-400 font-sans leading-normal font-light">
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sector specific roles for IT Recruitment */}
                {activeService.rolesRecruited && activeService.rolesRecruited.length > 0 && (
                  <div className="p-5 rounded-xl bg-brand-teal-dark/50 border border-brand-teal-light/25 mb-10 space-y-3">
                    <h4 className="text-xs uppercase font-mono text-brand-gold tracking-wider font-semibold flex items-center gap-2">
                      <UserPlus size={14} /> Specialize Recruited Technical Roles:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeService.rolesRecruited.map((role, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 text-sm rounded-md bg-brand-teal-deep border border-brand-teal-light/35 hover:border-brand-gold/45 text-gray-300 font-mono transition-colors"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Benefits */}
                <div className="pt-6 border-t border-neutral-850">
                  <h4 className="text-xs uppercase font-mono text-gray-400 tracking-wider mb-4 font-semibold">
                    Strategic Business Benefits:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeService.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-4.5 h-4.5 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mt-0.5 shrink-0">
                          <Check size={10} className="stroke-[3]" />
                        </div>
                        <span className="text-base text-gray-200 font-sans font-light">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
