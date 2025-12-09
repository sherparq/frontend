import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { Normativa } from './components/Normativa';

const LandingPage: React.FC<{ onContextSelect: (ctx: SelectedContext | null) => void }> = ({ onContextSelect }) => {
  return (
    <>
      <Hero id="home" />
      <Partners onContextSelect={onContextSelect} />
      <Services id="services" onContextSelect={onContextSelect} />
      <Compliance onContextSelect={onContextSelect} />
      <SafetyStats />
      <About id="about" onContextSelect={onContextSelect} />
      <Portfolio id="portfolio" onContextSelect={onContextSelect} />
      <Contact id="contact" onContextSelect={onContextSelect} />
    </>
  );
};

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedContext, setSelectedContext] = useState<SelectedContext | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Only run scroll spy on the home page
    if (location.pathname !== '/') return;

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
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-800 selection:bg-zinc-800 selection:text-white">
      <Navbar activeSection={activeSection} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage onContextSelect={setSelectedContext} />} />
          <Route path="/normativa" element={<Normativa />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget activeSection={activeSection} selectedContext={selectedContext} onContextSelect={setSelectedContext} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  );
};

export default App;