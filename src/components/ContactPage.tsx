import React from 'react';
import { MessageSquareCode } from 'lucide-react';
import ContactForm from './ContactForm';
import BackgroundVideo from './BackgroundVideo';

export default function ContactPage({ initialService = '', onExit }: { initialService?: string; onExit?: () => void }) {
  return (
    <section id="contact-us" className="py-24 md:py-32 relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      <BackgroundVideo src="/assets/contact.mp4" />

      {/* Backdrop visual elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/2 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Contact Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111115]/85 border border-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">Contact Gateway</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none uppercase">
            Let's Start a <br />
            <span className="text-brand-gold">
              Growth Collaboration
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 font-sans leading-relaxed font-light">
            Partner with Kirubin Technologies to transform operations, reduce cost metrics, and scale IT engineering capabilities globally. Let's start the conversation.
          </p>
        </div>

        {/* Portal split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Contact Form submission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display font-extrabold text-white tracking-tight uppercase">
                Submit Proposal Enquiry
              </h3>
            </div>

            <div className="p-6 md:p-8 rounded-2xl glossy-teal-card">
              <ContactForm initialService={initialService} onExit={onExit} />
            </div>
          </div>

          {/* QR Code Scanner section */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="p-8 rounded-2xl glossy-teal-card border border-brand-teal/40 w-full max-w-md text-center space-y-6">
              <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                Scan here to schedule a call with our team
              </h4>
              <div className="p-4 bg-white rounded-2xl inline-block shadow-inner relative mx-auto">
                <img 
                  src="/assets/finalscanner.png" 
                  alt="Scan to schedule a call" 
                  className="w-56 h-56 mx-auto object-contain" 
                  style={{ imageRendering: 'auto' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm text-gray-400 font-sans max-w-xs mx-auto leading-relaxed">
                Open your smartphone camera to scan, check direct availability, and secure your consultation instantly.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
