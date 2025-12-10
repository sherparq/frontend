import React, { useState, useEffect } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Experticia', href: '#services' },
    { name: 'Portafolio', href: '#portfolio' },
    { name: 'Contacto', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // If we're not on the landing page, navigate to it first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on the landing page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group cursor-pointer">
          <div className={`p-2 border-2 transition-colors duration-300 ${isScrolled ? 'border-zinc-900 text-zinc-900' : 'border-zinc-800 text-zinc-800'}`}>
            <Hexagon size={24} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tight leading-none ${isScrolled ? 'text-zinc-900' : 'text-zinc-900'}`}>
              Sherp<span className="font-light">ARQ</span>
            </span>
            <span className="text-[0.6rem] uppercase tracking-widest text-zinc-500">Arquitectura & Ingeniería</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm uppercase tracking-widest font-medium hover:text-zinc-500 transition-colors relative cursor-pointer
                ${activeSection === link.href.substring(1) ? 'text-black after:w-full' : 'text-zinc-600 after:w-0'}
                after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-black after:transition-all after:duration-300
              `}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-lg font-medium cursor-pointer ${activeSection === link.href.substring(1) ? 'text-black pl-2 border-l-2 border-black' : 'text-zinc-500'
                }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};