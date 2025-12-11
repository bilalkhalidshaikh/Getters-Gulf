import React from 'react';
import { motion } from 'framer-motion';
import { LEADERS, IMAGE_PROMPT_SUFFIX } from '../constants';
import { TranslationSchema, Language } from '../types';
import { Linkedin, Mail } from 'lucide-react';

interface LeadershipProps {
  t: TranslationSchema;
  lang: Language;
}

const Leadership: React.FC<LeadershipProps> = ({ t, lang }) => {
  return (
    <section className="min-h-screen pt-32 pb-24 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-blue/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-20 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">{t.leadership.title}</h1>
          <p className="text-xl text-gray-400">{t.leadership.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {LEADERS.map((leader, idx) => {
            const imgSrc = `https://image.pollinations.ai/prompt/${leader.imagePrompt} ${IMAGE_PROMPT_SUFFIX}?nologo=true`;
            return (
              <motion.div 
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                 <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-8 border border-white/10 bg-carbon">
                   <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent z-10 opacity-80" />
                   <img 
                    src={imgSrc} 
                    alt={leader.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
                   />
                   
                   <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-void to-transparent">
                     <h2 className="text-4xl font-display font-bold text-white mb-2">{leader.name}</h2>
                     <div className="text-electric-teal font-mono tracking-widest uppercase mb-4">{t[leader.roleKey]}</div>
                     
                     <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <button className="p-2 bg-white/10 rounded hover:bg-white/20 transition-colors text-white"><Linkedin size={20}/></button>
                        <button className="p-2 bg-white/10 rounded hover:bg-white/20 transition-colors text-white"><Mail size={20}/></button>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-4 px-4">
                    <div className="inline-block px-3 py-1 border border-white/10 rounded-full text-xs text-gray-400 uppercase tracking-wider bg-white/5">
                        {t[leader.archetypeKey]}
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-electric-teal pl-6">
                        {t[leader.descriptionKey]}
                    </p>
                 </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Leadership;