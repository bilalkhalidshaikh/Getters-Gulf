import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Server, ChevronRight } from 'lucide-react';
import { TranslationSchema, Language } from '../types';

interface PhilosophyProps {
  t: TranslationSchema;
  lang: Language;
}

const Philosophy: React.FC<PhilosophyProps> = ({ t, lang }) => {
  const isRTL = lang === 'ar';

  return (
    <section className="min-h-screen pt-32 pb-24 relative overflow-hidden">
       {/* Ambient Backdrops */}
       <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-slate-blue/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">{t.philosophy.title}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t.philosophy.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {/* Card 1: Governance */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group glass-panel p-10 rounded-2xl relative overflow-hidden h-full border-t border-slate-blue/20"
          >
            <div className="absolute top-0 right-0 p-40 bg-slate-blue/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 text-white group-hover:border-slate-blue/50 group-hover:text-slate-blue transition-colors shadow-lg">
              <ShieldCheck size={32} />
            </div>
            
            <div className="text-sm font-mono text-slate-blue mb-2 tracking-widest uppercase">{t.philosophy.card1Subtitle}</div>
            <h3 className="text-3xl font-bold text-white mb-6">{t.philosophy.card1Title}</h3>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t.philosophy.card1Desc}
            </p>

            <div className="h-px w-full bg-white/10 mb-8" />

            <div className="flex gap-4">
               <div className="flex-1 p-4 rounded bg-white/5 border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">G20</div>
                  <div className="text-xs text-gray-500">Standard</div>
               </div>
               <div className="flex-1 p-4 rounded bg-white/5 border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">ACCA</div>
                  <div className="text-xs text-gray-500">Control</div>
               </div>
            </div>
          </motion.div>

          {/* Card 2: Deep Tech */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group glass-panel p-10 rounded-2xl relative overflow-hidden h-full border-t border-electric-teal/20"
          >
            <div className="absolute bottom-0 left-0 p-40 bg-electric-teal/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 text-white group-hover:border-electric-teal/50 group-hover:text-electric-teal transition-colors shadow-lg">
              <Zap size={32} />
            </div>
            
            <div className="text-sm font-mono text-electric-teal mb-2 tracking-widest uppercase">{t.philosophy.card2Subtitle}</div>
            <h3 className="text-3xl font-bold text-white mb-6">{t.philosophy.card2Title}</h3>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t.philosophy.card2Desc}
            </p>

            <div className="h-px w-full bg-white/10 mb-8" />

             <div className="flex gap-4">
               <div className="flex-1 p-4 rounded bg-white/5 border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">20x</div>
                  <div className="text-xs text-gray-500">Speed</div>
               </div>
               <div className="flex-1 p-4 rounded bg-white/5 border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">0ms</div>
                  <div className="text-xs text-gray-500">Latency</div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Process */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-white/10 pt-16"
        >
            <h3 className="text-2xl font-display font-bold text-white mb-12 text-center">{t.philosophy.processTitle}</h3>
            
            <div className="relative grid md:grid-cols-3 gap-8">
                {[
                  { title: t.philosophy.step1, icon: <Server /> },
                  { title: t.philosophy.step2, icon: <Zap /> },
                  { title: t.philosophy.step3, icon: <ShieldCheck /> }
                ].map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-carbon border border-electric-teal/30 flex items-center justify-center text-electric-teal mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                            {step.icon}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                        <div className="text-sm text-gray-500 font-mono">STEP 0{i+1}</div>
                        
                        {/* Connector Line */}
                        {i !== 2 && (
                            <div className={`hidden md:block absolute top-6 h-0.5 bg-gradient-to-r from-electric-teal/50 to-transparent w-full -z-10 ${isRTL ? 'right-1/2' : 'left-1/2'}`} />
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;