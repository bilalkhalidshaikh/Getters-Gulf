import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Globe } from 'lucide-react';
import { Language, View, TranslationSchema } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationSchema;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, lang, setLang, t }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-void/70 backdrop-blur-xl"
    >
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setView('home')}
      >
        <div className="p-2 rounded bg-electric-teal/10 border border-electric-teal/20 text-electric-teal">
          <Terminal size={20} />
        </div>
        <span className="text-lg font-bold tracking-tight text-white font-display">GETTERS GULF</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <button 
          onClick={() => setView('philosophy')} 
          className={`hover:text-white transition-colors ${currentView === 'philosophy' ? 'text-electric-teal' : ''}`}
        >
          {t.nav.philosophy}
        </button>
        <button 
          onClick={() => setView('systems')} 
          className={`hover:text-white transition-colors ${currentView === 'systems' ? 'text-electric-teal' : ''}`}
        >
          {t.nav.systems}
        </button>
        <button 
          onClick={() => setView('leadership')} 
          className={`hover:text-white transition-colors ${currentView === 'leadership' ? 'text-electric-teal' : ''}`}
        >
          {t.nav.leadership}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="relative group">
           <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono">
             <Globe size={16} />
             <span className="uppercase">{lang}</span>
           </button>
           <div className="absolute top-full right-0 mt-2 w-32 bg-carbon border border-white/10 rounded-lg overflow-hidden hidden group-hover:block shadow-xl">
              {(['en', 'ar', 'it', 'de'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${lang === l ? 'text-electric-teal' : 'text-gray-400'}`}
                >
                  {l === 'en' ? 'English' : l === 'ar' ? 'العربية' : l === 'it' ? 'Italiano' : 'Deutsch'}
                </button>
              ))}
           </div>
        </div>

        <button className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-void bg-white rounded hover:bg-electric-teal transition-all duration-300">
          <span>{t.nav.deploy}</span>
          <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''}`} />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navigation;