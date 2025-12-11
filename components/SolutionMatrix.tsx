import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_CATEGORIES, IMAGE_PROMPT_SUFFIX } from '../constants';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { TranslationSchema, Language } from '../types';

interface SolutionMatrixProps {
  t: TranslationSchema;
  lang: Language;
}

const SolutionMatrix: React.FC<SolutionMatrixProps> = ({ t, lang }) => {
  const [activeTab, setActiveTab] = useState(SERVICE_CATEGORIES[0].id);
  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === activeTab) || SERVICE_CATEGORIES[0];
  const isRTL = lang === 'ar';
  
  const categoryImage = `https://image.pollinations.ai/prompt/${activeCategory.promptContext} ${IMAGE_PROMPT_SUFFIX}?nologo=true`;

  return (
    <section className="min-h-screen pt-32 pb-24 bg-carbon/40 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">{t.systems.title}</h1>
            <p className="text-xl text-gray-400 max-w-xl">{t.systems.subtitle}</p>
          </motion.div>
        </div>

        {/* Sidebar + Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 flex flex-col gap-2">
                {SERVICE_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`text-left px-6 py-4 rounded-xl transition-all duration-300 border border-transparent ${
                            activeTab === cat.id 
                            ? 'bg-white/5 border-electric-teal/30 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]' 
                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                        }`}
                    >
                        <div className="font-bold text-lg">{t[cat.nameKey]}</div>
                        <div className="text-xs text-gray-500 font-mono mt-1 uppercase">{t[cat.descriptionKey]}</div>
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
                 <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                 >
                    {/* Header Image */}
                    <div className="h-[250px] w-full rounded-2xl overflow-hidden relative border border-white/10">
                         <div className="absolute inset-0 bg-gradient-to-r from-void via-void/50 to-transparent z-10" />
                         <img 
                            src={categoryImage} 
                            alt={t[activeCategory.nameKey]} 
                            className="w-full h-full object-cover opacity-60" 
                        />
                        <div className="absolute bottom-8 left-8 z-20">
                            <h2 className="text-3xl font-bold text-white">{t[activeCategory.nameKey]}</h2>
                        </div>
                    </div>

                    {/* Grid of Items */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {activeCategory.items.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`glass-panel p-6 rounded-xl group relative overflow-hidden border border-white/5 hover:border-electric-teal/30 transition-all ${item.span || ''}`}
                            >
                                <div className={`absolute top-0 w-1 h-full bg-electric-teal/50 transition-all duration-300 opacity-0 group-hover:opacity-100 ${isRTL ? 'right-0' : 'left-0'}`} />
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-white/5 rounded-lg text-electric-teal">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                                </div>

                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-electric-teal transition-colors">
                                    {t[item.titleKey]}
                                </h4>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {t[item.descriptionKey]}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                 </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionMatrix;