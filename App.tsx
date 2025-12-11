import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HomeShowcase from './components/HomeShowcase';
import Philosophy from './components/Philosophy';
import SolutionMatrix from './components/SolutionMatrix';
import Leadership from './components/Leadership';
import Footer from './components/Footer';
import AIOracle from './components/AIOracle';
import { Language, View } from './types';
import { TRANSLATIONS } from './constants';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setView] = useState<View>('home');

  // Translations helper
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div 
      className={`min-h-screen bg-void text-white selection:bg-electric-teal selection:text-void font-sans ${isRTL ? 'font-arabic' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Global Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"></div>
      
      {/* Decorative Gradient Blob */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-slate-blue/10 blur-[150px] rounded-full pointer-events-none -z-10 translate-x-[-50%] translate-y-[-50%]"></div>

      <Navigation 
        currentView={currentView} 
        setView={setView} 
        lang={lang} 
        setLang={setLang}
        t={t}
      />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero t={t} lang={lang} />
              <HomeShowcase t={t} />
            </motion.div>
          )}

          {currentView === 'philosophy' && (
            <motion.div 
              key="philosophy"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Philosophy t={t} lang={lang} />
            </motion.div>
          )}

          {currentView === 'systems' && (
            <motion.div 
              key="systems"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SolutionMatrix t={t} lang={lang} />
            </motion.div>
          )}

          {currentView === 'leadership' && (
            <motion.div 
              key="leadership"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Leadership t={t} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer t={t} />
      <AIOracle />
    </div>
  );
};

export default App;