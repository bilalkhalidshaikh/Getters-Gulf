import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, ArrowRight } from 'lucide-react';
import { IMAGE_PROMPT_SUFFIX } from '../constants';
import { TranslationSchema, Language } from '../types';

interface HeroProps {
  t: TranslationSchema;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ t, lang }) => {
  const heroImage = `https://image.pollinations.ai/prompt/abstract neural network connecting global nodes, glowing data lines, black void background, 3d render ${IMAGE_PROMPT_SUFFIX}?nologo=true`;
  const isRTL = lang === 'ar';

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-electric-teal/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-teal/30 bg-electric-teal/5 text-electric-teal text-xs tracking-wider uppercase font-semibold"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-electric-teal animate-pulse" />
            {t.hero.tagline}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-white whitespace-pre-line"
          >
            {t.hero.headline}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-4 bg-electric-teal text-void font-bold rounded hover:bg-electric-teal/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              {t.hero.cta}
              <ArrowRight size={18} className={isRTL ? "rotate-180" : ""} />
            </button>
            <button className="px-8 py-4 glass-panel text-white font-semibold rounded hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              {t.hero.caseStudies}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-8 pt-8 border-t border-white/5 text-gray-500 text-sm font-mono"
          >
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>{t.hero.loc1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={16} />
              <span>{t.hero.loc2}</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] w-full hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent z-10" />
          <img 
            src={heroImage} 
            alt="AI Neural Network" 
            className="w-full h-full object-cover rounded-2xl border border-white/10 opacity-80"
          />
          
          {/* Floating Stats Cards */}
          <motion.div 
            initial={{ x: isRTL ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className={`absolute top-20 glass-panel p-4 rounded-xl z-20 w-48 ${isRTL ? 'left-10' : 'right-10'}`}
          >
            <div className="text-xs text-gray-400 mb-1">{t.hero.stat1Label}</div>
            <div className="text-2xl font-bold text-white">{t.hero.stat1Value}</div>
            <div className="text-xs text-electric-teal mt-2 flex items-center gap-1">
              <span className="w-1 h-1 bg-electric-teal rounded-full" />
              Live Optimization
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: isRTL ? 20 : -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`absolute bottom-32 glass-panel p-4 rounded-xl z-20 w-56 ${isRTL ? 'right-0' : 'left-0'}`}
          >
            <div className="text-xs text-gray-400 mb-1">{t.hero.stat2Label}</div>
            <div className="text-2xl font-bold text-white">{t.hero.stat2Value}</div>
            <div className="h-1 w-full bg-white/10 mt-3 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-electric-teal rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;