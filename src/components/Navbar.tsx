import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'About us', id: 'about' },
    { name: 'Our Services', id: 'services' },
    { name: 'Industries', id: 'industries' },
    { name: 'Engagement Model', id: 'engagement' },
    { name: 'Why Choose Us', id: 'why-choose-us' },
    { name: 'Contact us', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || currentPage !== 'about'
          ? 'bg-brand-teal-deep/90 backdrop-blur-md py-4 border-b border-brand-teal-light/20 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('about')}
            className="flex items-center space-x-3 group text-left focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 bg-neutral-900 border border-neutral-750 group-hover:border-brand-gold">
              <Sparkles className="text-brand-gold w-6.5 h-6.5 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-display font-bold text-xl md:text-2xl tracking-tight block text-white group-hover:text-brand-gold transition-colors duration-300">
                Kirubin<span className="text-brand-gold font-light">Technologies</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#a8b2c1] block -mt-1 font-mono">
                IT BUILDS | ITES ENABLES | BPO EXECUTE | KPO THINKS
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-sans text-base font-medium transition-colors duration-200 relative py-1 group cursor-pointer ${
                    currentPage === item.id 
                      ? 'text-brand-gold' 
                      : 'text-gray-300 hover:text-brand-gold'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300 ${
                    currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-brand-gold focus:outline-none transition-colors"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full border-b py-6 px-8 flex flex-col space-y-4 shadow-xl z-50 bg-brand-teal-dark/98 border-brand-teal/25">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-lg font-medium py-2 border-b border-neutral-850 transition-all duration-200 cursor-pointer ${
                currentPage === item.id ? 'text-brand-gold border-brand-gold/20' : 'text-gray-200 hover:text-brand-gold'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
