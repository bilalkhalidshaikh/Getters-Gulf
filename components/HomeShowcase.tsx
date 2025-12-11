import React from 'react';
import { motion } from 'framer-motion';
import { TranslationSchema } from '../types';
import { 
    NeuralMesh, ChaosSlider, TimezoneProfit, LiveTerminal, 
    DocScanner, SentimentRadar, ShadowFoundry, ExpertConstellation, 
    ROISimulator, NeuralHandshake 
} from './HomeWidgets';
import { Check, ArrowRight } from 'lucide-react';

interface HomeShowcaseProps {
  t: TranslationSchema;
}

const HomeShowcase: React.FC<HomeShowcaseProps> = ({ t }) => {
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const partners = [
    "TechCorp", "GlobalFinance", "HealthPlus", "LogiStream", "EstateFlow", "RetailAI", "LawBot", "EduMind"
  ];

  const techStack = [
    "Python", "TensorFlow", "PyTorch", "Kubernetes", "Docker", "React", "Next.js", "Node.js", "AWS", "GCP", "Azure", "OpenAI", "LlamaIndex", "LangChain"
  ];

  return (
    <div className="relative bg-void">
        
        {/* --- SECTION 1: THE MANIFESTO --- */}
        <section className="py-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-blue/10 to-transparent pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl"
                >
                    <div className="text-electric-teal font-mono mb-6 tracking-widest uppercase">The Mission</div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
                        The Era of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Linear Growth</span> is Over.
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12">
                        Legacy agencies sell you hours. We sell you <span className="text-white font-semibold">outcomes</span>. 
                        By decoupling labor from output through autonomous agentic swarms, we provide infinite scalability without the headcount bloat.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {["Zero Human Latency", "24/7 Operational Uptime", "Sovereign Data Privacy", "Fixed-Cost Scalability"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="p-1 bg-electric-teal/10 rounded-full text-electric-teal">
                                    <Check size={16} />
                                </div>
                                <span className="text-gray-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>

        {/* --- SECTION 2: TECH STACK MARQUEE --- */}
        <section className="py-12 border-y border-white/5 bg-carbon/50 overflow-hidden">
            <div className="container mx-auto px-6 mb-6">
                <div className="text-xs text-gray-500 font-mono text-center uppercase tracking-widest">Powered By Sovereign Code</div>
            </div>
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                    {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                        <span key={i} className="text-2xl font-display font-bold text-white/20 hover:text-white/80 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>

        {/* --- SECTION 3: SYSTEM CAPABILITY (BENTO GRID) --- */}
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl font-display font-bold text-white mb-4">System Capability</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Live operational metrics. From chaos to order in milliseconds.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    <motion.div variants={itemVariant} className="col-span-1 md:col-span-2 row-span-2">
                        <NeuralMesh />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 md:col-span-2 row-span-1">
                        <ChaosSlider />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <TimezoneProfit />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <LiveTerminal />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <DocScanner />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <SentimentRadar />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <ROISimulator />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <ShadowFoundry />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <ExpertConstellation />
                    </motion.div>
                    <motion.div variants={itemVariant} className="col-span-1 row-span-1">
                        <NeuralHandshake />
                    </motion.div>
                </motion.div>
            </div>
        </section>

        {/* --- SECTION 4: TRUSTED PARTNERS --- */}
        <section className="py-24 bg-carbon border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <div className="text-sm font-mono text-gray-500 mb-12 uppercase tracking-widest">Trusting the Infrastructure</div>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale">
                    {partners.map((p, i) => (
                        <div key={i} className="text-xl font-bold font-display text-white">{p}</div>
                    ))}
                </div>
                
                <div className="mt-20">
                     <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full transition-all flex items-center gap-2 mx-auto">
                        Start Your Transformation
                        <ArrowRight size={18} />
                     </button>
                </div>
            </div>
        </section>

        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-marquee {
                animation: marquee 30s linear infinite;
            }
        `}</style>
    </div>
  );
};

export default HomeShowcase;