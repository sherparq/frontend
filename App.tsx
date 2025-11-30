import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatWidget, SelectedContext } from './components/ChatWidget';

import { Partners } from './components/Partners';
import { Compliance } from './components/Compliance';
import { SafetyStats } from './components/SafetyStats';

const App: React.FC = () => {
  // Simple scroll spy state to highlight navbar items
  const [activeSection, setActiveSection] = useState('home');
  const [selectedContext, setSelectedContext] = useState<SelectedContext | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact', 'compliance'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-800 selection:bg-zinc-800 selection:text-white">
      <Navbar activeSection={activeSection} />
      <main className="flex-grow">
        <Hero id="home" />
        <Partners onContextSelect={setSelectedContext} />
        <Services id="services" onContextSelect={setSelectedContext} />
        <Compliance onContextSelect={setSelectedContext} />
        <SafetyStats />
        <About id="about" onContextSelect={setSelectedContext} />
        <Portfolio id="portfolio" onContextSelect={setSelectedContext} />
        <Contact id="contact" onContextSelect={setSelectedContext} />
      </main>
      <Footer />
      <ChatWidget activeSection={activeSection} selectedContext={selectedContext} onContextSelect={setSelectedContext} />
    </div>
  );
};

export default App;