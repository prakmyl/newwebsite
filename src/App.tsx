import { useState } from 'react';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import ServicesSection from './components/ServicesSection';
import Industries from './components/Industries';
import EngagementModel from './components/EngagementModel';
import WhyChooseUs from './components/WhyChooseUs';
import ContactPage from './components/ContactPage';
import BackgroundVideo from './components/BackgroundVideo';

import { Sparkles, ArrowRight, ShieldCheck, Mail, MapPin, Globe, Clock, ChevronRight, Video, RefreshCw, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('about'); // 'about' | 'services' | 'industries' | 'engagement' | 'why-choose-us' | 'contact' | 'video-test'

  // Dynamic video test diagnostics panel states
  const [testVideoSrc, setTestVideoSrc] = useState('/assets/contact.mp4');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [enableCacheBuster, setEnableCacheBuster] = useState(true);
  const [cacheBustToken, setCacheBustToken] = useState(Date.now().toString());
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  const navigateToPage = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUs key="about" />;
      case 'services':
        return <ServicesSection key="services" />;
      case 'industries':
        return <Industries key="industries" />;
      case 'engagement':
        return <EngagementModel key="engagement" />;
      case 'why-choose-us':
        return <WhyChooseUs key="why-choose-us" />;
      case 'contact':
        return <ContactPage onExit={() => navigateToPage('about')} />;
      case 'video-test': {
        const activeSrc = (customVideoUrl.trim() !== '' ? customVideoUrl : testVideoSrc) + (enableCacheBuster ? '?cb=' + cacheBustToken : '');
        return (
          <motion.div
            key="video-test"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center pt-24 bg-black overflow-hidden px-4"
          >
            {/* The background video directly played with no overlays */}
            <BackgroundVideo src={activeSrc} showOverlay={false} opacity={1} zIndex="z-0" />

            {/* Float Diagnostic Console */}
            <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none p-4 overflow-y-auto">
              <div className="w-full max-w-xl bg-[#0a0a0c]/95 border border-[#222222] rounded-2xl shadow-2xl pointer-events-auto p-5 sm:p-6 text-left relative z-25">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Video className="text-brand-gold w-5 h-5" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Video Test Dashboard &amp; Diagnostics</h4>
                      <p className="text-[10px] font-mono text-neutral-400">Environment Sandbox Analyzer</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsConsoleOpen(!isConsoleOpen)} 
                    className="p-1 px-2.5 rounded-md bg-[#16161a] hover:bg-[#222226] border border-neutral-800 text-xs text-brand-gold transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    {isConsoleOpen ? <EyeOff size={12} /> : <Eye size={12} />}
                    {isConsoleOpen ? 'Hide' : 'Show Console'}
                  </button>
                </div>

                {isConsoleOpen ? (
                  <div className="space-y-4">
                    {/* Active playing indicator */}
                    <div className="p-3 bg-black rounded-lg border border-neutral-800 font-mono text-xs text-neutral-300 break-all flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mt-1.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-bold text-xs">Currently Streaming URL</span>
                        <span className="text-emerald-400 text-[11px] font-mono block select-all mt-1">{activeSrc}</span>
                      </div>
                    </div>

                    {/* Step 1: Select server asset */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-mono text-brand-gold font-bold">1. Select Server Resource File to Preview</label>
                      <select 
                        value={testVideoSrc} 
                        onChange={(e) => {
                          setTestVideoSrc(e.target.value);
                          setCustomVideoUrl(''); // clear custom url when choosing a select
                        }}
                        className="w-full p-2 text-xs bg-[#111115] border border-neutral-800 rounded-lg text-white font-mono focus:border-brand-gold outline-none cursor-pointer"
                      >
                        <option value="/assets/home.mp4">/assets/home.mp4 (Home Page Video)</option>
                        <option value="/assets/download.mp4">/assets/download.mp4 (Services Page Video)</option>
                        <option value="/assets/why.mp4">/assets/why.mp4 (Why Choose Us Video)</option>
                        <option value="/assets/engagement.mp4">/assets/engagement.mp4 (Engagement Model Video)</option>
                        <option value="/assets/industries.mp4">/assets/industries.mp4 (Industries Page Video)</option>
                        <option value="/assets/contact.mp4">/assets/contact.mp4 (Contactus Page Video)</option>
                        <option value="/assets/about.mp4">/assets/about.mp4 (About Us Page Video)</option>
                      </select>
                    </div>

                    {/* Step 2: Custom URL text box */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase font-mono text-brand-gold font-bold">2. Test External Stream Link (Bypass Uploads)</label>
                      <input 
                        type="text"
                        placeholder="Paste an external raw MP4 URL (e.g. https://.../stream.mp4)"
                        value={customVideoUrl}
                        onChange={(e) => setCustomVideoUrl(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#111115] border border-neutral-800 rounded-lg text-gray-250 focus:border-brand-gold outline-none font-mono"
                      />
                    </div>

                    {/* Trigger controls / caching controllers */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between bg-[#111115] p-3 rounded-xl border border-neutral-800">
                      <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-neutral-300 font-mono">
                        <input 
                          type="checkbox"
                          checked={enableCacheBuster}
                          onChange={(e) => setEnableCacheBuster(e.target.checked)}
                          className="rounded border-neutral-800 text-brand-gold bg-[#16161a] focus:ring-0 focus:ring-offset-0"
                        />
                        <span>Enable Cache Buster (?cb=...)</span>
                      </label>
                      
                      <button
                        onClick={() => setCacheBustToken(Date.now().toString())}
                        className="px-4 py-2 bg-[#1b1b22] hover:bg-neutral-800 text-white font-mono text-xs border border-neutral-750 hover:border-neutral-600 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer font-bold uppercase tracking-wider"
                      >
                        <RefreshCw size={13} className="text-brand-gold animate-[spin_8s_linear_infinite]" />
                        Bust Cache Now
                      </button>
                    </div>

                    {/* Educational diagnostics */}
                    <div className="bg-[#1c1214]/55 border border-red-950/40 p-3.5 rounded-xl space-y-2.5">
                      <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                        <AlertTriangle size={15} />
                        How to Solve: Video Not Showing Your Upload
                      </div>
                      
                      <ul className="text-xs space-y-2 text-neutral-300 list-disc list-outside pl-4 font-sans font-light leading-relaxed">
                        <li>
                          <strong className="text-white font-semibold font-mono">Persistent Browser Cache</strong>: Browsers cache video files aggressively. If you delete or rename a file, your browser may still stream the old file because it keeps getting pulled from your local disk cache. Toggle <strong className="font-semibold text-brand-gold font-mono">Bust Cache Now</strong> or clear your browser cache to force a fresh fetch.
                        </li>
                        <li>
                          <strong className="text-white font-semibold font-mono">Payload &amp; Upload size restrictions</strong>: In browser-based workspaces, uploading files over 1–2MB directly through drag-and-drop can often timeout, stall, or fail to sync to the server without reporting an error. 
                        </li>
                        <li>
                          <strong className="text-white font-semibold font-mono">How to verify server size</strong>: The manifest sizes listed above are checked directly on the server's real filesystem. If <strong className="font-semibold text-brand-gold font-mono">about.mp4</strong> registers exactly <strong className="font-semibold text-brand-gold font-mono">5,510,872 bytes</strong>, your local upload has NOT arrived yet (it is still our default backup rabbit cartoon).
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 text-center">
                    <p className="text-xs text-neutral-500 italic">Console is minimized. The video is playing behind. Click &quot;Show Console&quot; above to restore the diagnostic panel.</p>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        );
      }
      default:
        return <AboutUs key="about-usr" />;
    }
  };

  return (
    <div className="bg-brand-teal-deep min-h-screen text-gray-100 selection:bg-brand-gold selection:text-black flex flex-col justify-between transition-colors duration-500">
      
      {/* Sticky Top Navigation block */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Stateful View Router rendered with smooth fade and translation */}
      <main className="grow">
        <AnimatePresence mode="wait">
          {renderActivePage()}
        </AnimatePresence>
      </main>



    </div>
  );
}
