import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Globe, Shield, Zap, FileText, Activity, Users, Code, Lock, 
  Terminal, DollarSign, Moon, Sun, Search, Smartphone, ChevronRight 
} from 'lucide-react';
import { IMAGE_PROMPT_SUFFIX } from '../constants';

// --- 1. Global Neural Mesh ---
export const NeuralMesh = () => {
  const cities = [
    { name: 'Riyadh', x: 60, y: 45, label: 'Capital Core' },
    { name: 'Milan', x: 52, y: 32, label: 'Design Hub' },
    { name: 'London', x: 48, y: 25, label: 'Deployed' },
    { name: 'NY', x: 28, y: 32, label: 'Deployed' },
    { name: 'Berlin', x: 54, y: 26, label: 'Target' },
  ];

  return (
    <div className="relative w-full h-full bg-void overflow-hidden rounded-xl border border-white/5 group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-blue/20 to-transparent opacity-40" />
      <div className="absolute inset-4 border border-white/5 rounded-lg" />
      
      {/* Abstract Map Grid */}
      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-gray-500" />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path 
          d="M 60 45 L 52 32 L 48 25 L 28 32"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B68E6" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Cities */}
      {cities.map((city, i) => (
        <motion.div
          key={i}
          className="absolute group/city cursor-pointer"
          style={{ left: `${city.x}%`, top: `${city.y}%` }}
          whileHover={{ scale: 1.2 }}
        >
          <div className="relative">
            <div className="w-2 h-2 bg-electric-teal rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-electric-teal blur-sm rounded-full opacity-50" />
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/city:opacity-100 transition-opacity bg-black/80 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] whitespace-nowrap text-white z-20 pointer-events-none">
            <div className="font-bold">{city.name}</div>
            <div className="text-electric-teal">{city.label}</div>
          </div>
        </motion.div>
      ))}
      
      <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-500">
        <span className="text-electric-teal">●</span> LIVE MESH
      </div>
    </div>
  );
};

// --- 2. Chaos vs Order Slider ---
export const ChaosSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const chaosImg = `https://image.pollinations.ai/prompt/chaotic messy office desk with paperwork explosion stress overload red lighting ${IMAGE_PROMPT_SUFFIX}?nologo=true`;
  const orderImg = `https://image.pollinations.ai/prompt/futuristic clean minimalist data center white and glass server room calm blue lighting ${IMAGE_PROMPT_SUFFIX}?nologo=true`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full rounded-xl overflow-hidden cursor-ew-resize group border border-white/10"
    >
      {/* Right Layer (Order) */}
      <div className="absolute inset-0">
        <img src={orderImg} className="w-full h-full object-cover" alt="Order" />
        <div className="absolute inset-0 bg-electric-teal/10 mix-blend-overlay" />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-electric-teal font-bold border border-electric-teal/30">
          GETTERS SYSTEM
        </div>
      </div>

      {/* Left Layer (Chaos) - Clipped */}
      <div 
        className="absolute inset-0 overflow-hidden border-r border-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ width: `${sliderPos}%` }}
      >
        <img src={chaosImg} className="absolute inset-0 w-[100vw] max-w-none h-full object-cover" style={{ width: containerRef.current?.offsetWidth }} alt="Chaos" />
        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay" />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-red-400 font-bold border border-red-400/30">
          LEGACY OPS
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_15px_white]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-void shadow-xl">
          <Activity size={16} />
        </div>
      </div>
    </div>
  );
};

// --- 3. 24/7 Profit Timezone ---
export const TimezoneProfit = () => {
  const [activeCity, setActiveCity] = useState(0);
  const [revenue, setRevenue] = useState(12420);
  
  const cities = [
    { name: 'London', time: '02:00', icon: Moon },
    { name: 'Riyadh', time: '05:00', icon: Moon },
    { name: 'Milan', time: '03:00', icon: Moon },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCity((prev) => (prev + 1) % cities.length);
    }, 2000);

    const revTimer = setInterval(() => {
        // Only increment nicely if it looks like night work logic, but for demo just increment
        setRevenue(prev => prev + Math.floor(Math.random() * 50));
    }, 100);

    return () => {
        clearInterval(timer);
        clearInterval(revTimer);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-full bg-carbon/50 p-6 rounded-xl border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs text-gray-400 uppercase tracking-widest">Global Ops</div>
        <div className="text-electric-teal font-mono animate-pulse">LIVE</div>
      </div>

      <div className="space-y-4">
        {cities.map((city, idx) => (
          <motion.div 
            key={idx}
            animate={{ opacity: activeCity === idx ? 1 : 0.3, scale: activeCity === idx ? 1.05 : 1 }}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${activeCity === idx ? 'bg-white/5 border-electric-teal/30' : 'border-transparent'}`}
          >
            <div className="flex items-center gap-3">
              <city.icon size={16} className={activeCity === idx ? 'text-electric-teal' : 'text-gray-500'} />
              <span className="font-bold text-white">{city.name}</span>
            </div>
            <span className="font-mono text-xs text-gray-400">{city.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="text-xs text-gray-500 mb-1">Passive Revenue Generated</div>
        <div className="text-2xl font-mono text-electric-teal font-bold flex items-center gap-1">
          <DollarSign size={20} />
          {revenue.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

// --- 4. Live Terminal Log ---
export const LiveTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
    "System: Incoming Lead from Zillow (London)...",
    "Agent: Qualifying Budget...",
    "Analysis: High Intent Detected (98%)",
    "Action: Booking Appointment for 9:00 AM...",
    "Status: SUCCESS. Revenue Captured.",
    "System: Syncing with CRM...",
    "System: Deploying Contract Review Bot...",
    "Agent: Anomalies Checked. None found.",
    "Status: Transaction Validated."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-6), messages[i]]);
      i = (i + 1) % messages.length;
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border border-white/10 rounded-xl p-4 font-mono text-xs h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-auto text-gray-600">GETTERS_KERNEL_V4.2</span>
      </div>
      <div className="flex-1 overflow-hidden space-y-2">
        <AnimatePresence>
            {logs.map((log, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${log.includes("SUCCESS") ? "text-electric-teal" : log.includes("Action") ? "text-yellow-400" : "text-gray-400"}`}
            >
                <span className="mr-2 opacity-50">{new Date().toLocaleTimeString()}</span>
                {">"} {log}
            </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 5. Document X-Ray ---
export const DocScanner = () => {
  return (
    <div className="relative h-full w-full bg-carbon rounded-xl overflow-hidden border border-white/5 flex items-center justify-center group">
       <div className="w-32 h-40 bg-white/10 rounded border border-white/20 relative overflow-hidden">
          {/* Mock Lines */}
          <div className="space-y-2 p-4">
             <div className="h-2 w-1/2 bg-white/20 rounded" />
             <div className="h-2 w-full bg-white/10 rounded" />
             <div className="h-2 w-3/4 bg-white/10 rounded" />
             <div className="h-8 w-full bg-white/5 rounded mt-4" />
          </div>
          
          {/* Scan Line */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1 bg-electric-teal shadow-[0_0_15px_#00F0FF]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
       </div>

       {/* Floating Data */}
       <motion.div 
          className="absolute right-4 top-1/2 -translate-y-1/2 space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
       >
          <div className="bg-electric-teal/10 border border-electric-teal/30 p-2 rounded text-[10px] text-electric-teal backdrop-blur font-mono">
            TOTAL: $4,200.00
          </div>
          <div className="bg-electric-teal/10 border border-electric-teal/30 p-2 rounded text-[10px] text-electric-teal backdrop-blur font-mono">
            VENDOR: ACME CORP
          </div>
       </motion.div>

       <div className="absolute bottom-4 text-center w-full text-xs text-gray-500">
          Intelligent Extraction
       </div>
    </div>
  );
};

// --- 6. Sentiment Radar ---
export const SentimentRadar = () => {
  return (
    <div className="relative h-full w-full bg-void rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
        {/* Radar Rings */}
        {[1, 2, 3].map(r => (
            <div key={r} className="absolute rounded-full border border-white/5" style={{ width: `${r * 30}%`, height: `${r * 30}%` }} />
        ))}
        <div className="absolute w-[90%] h-[1px] bg-white/5 rotate-0" />
        <div className="absolute w-[90%] h-[1px] bg-white/5 rotate-90" />
        
        {/* Sweep */}
        <motion.div 
            className="absolute w-[45%] h-[45%] bg-gradient-to-t from-electric-teal/20 to-transparent top-[5%] right-[50%] origin-bottom-right rounded-tl-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Dots */}
        <motion.div className="absolute top-[30%] left-[60%] w-2 h-2 bg-red-500 rounded-full animate-ping" />
        <motion.div className="absolute top-[30%] left-[60%] w-2 h-2 bg-red-500 rounded-full" />
        
        {/* Rescue Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.line 
                x1="50%" y1="50%" x2="60%" y2="30%" 
                stroke="#00F0FF" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </svg>

        <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-[10px] text-gray-400">Churn Risk Detected</span>
        </div>
    </div>
  );
};

// --- 7. Shadow Foundry Blueprint ---
export const ShadowFoundry = () => {
  return (
    <div className="relative h-full w-full bg-slate-900 rounded-xl overflow-hidden border border-white/5 group">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Smartphone size={120} strokeWidth={0.5} className="text-white" />
        </div>
        
        {/* Building Animation */}
        <svg className="absolute inset-0 w-full h-full">
            <motion.rect 
                x="35%" y="20%" width="30%" height="60%" rx="10"
                fill="none" stroke="#00F0FF" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            {/* Elements appearing */}
            <motion.rect 
                x="40%" y="30%" width="20%" height="5%" rx="2" fill="#00F0FF"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
            />
            <motion.rect 
                x="40%" y="40%" width="20%" height="20%" rx="2" fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}
            />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent opacity-80" />
        <div className="absolute bottom-4 left-0 right-0 text-center">
            <div className="text-sm font-bold text-white">White Label Core</div>
            <div className="text-xs text-gray-500">We Build. You Brand.</div>
        </div>
    </div>
  );
};

// --- 8. Expert Constellation ---
export const ExpertConstellation = () => {
  return (
    <div className="relative h-full w-full bg-carbon rounded-xl border border-white/5 p-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-electric-teal/10 to-transparent" />
        
        <div className="grid grid-cols-2 gap-8 h-full items-center justify-center relative z-10">
            <div className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-electric-teal transition-colors">
                    <Code size={20} className="text-white" />
                </div>
                <span className="text-[10px] text-gray-400">Engineer</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-electric-teal transition-colors">
                    <Activity size={20} className="text-white" />
                </div>
                <span className="text-[10px] text-gray-400">Data Sci</span>
            </div>
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.line 
                x1="30%" y1="50%" x2="70%" y2="50%"
                stroke="white" strokeOpacity="0.1" strokeDasharray="4 4"
            />
        </svg>
    </div>
  );
};

// --- 9. ROI Simulator ---
export const ROISimulator = () => {
    const [tickets, setTickets] = useState(500);
    const savings = Math.floor(tickets * 25 * 0.7); // Dummy calculation

    return (
        <div className="h-full flex flex-col justify-center p-6 bg-glass-panel rounded-xl border border-white/10">
            <div className="text-xs text-gray-400 uppercase mb-4">Savings Calculator</div>
            
            <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-300">Support Tickets/Mo</span>
                    <span className="text-electric-teal">{tickets}</span>
                </div>
                <input 
                    type="range" min="100" max="2000" step="50"
                    value={tickets}
                    onChange={(e) => setTickets(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-electric-teal [&::-webkit-slider-thumb]:rounded-full"
                />
            </div>

            <div>
                <div className="text-xs text-gray-500 mb-1">Est. Monthly Savings</div>
                <div className="text-3xl font-display font-bold text-white">
                    ${savings.toLocaleString()}
                </div>
            </div>
        </div>
    );
};

// --- 10. Neural Handshake ---
export const NeuralHandshake = () => {
    const img = `https://image.pollinations.ai/prompt/cybernetic hand shaking human hand digital art macro 8k render dark background ${IMAGE_PROMPT_SUFFIX}?nologo=true`;
    
    return (
        <div className="relative h-full w-full rounded-xl overflow-hidden border border-white/5 group">
            <img src={img} alt="Trust" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="p-4 bg-void/50 backdrop-blur-xl border border-electric-teal/50 rounded-full"
                >
                    <Lock className="text-electric-teal" size={24} />
                </motion.div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="text-xs font-bold text-white tracking-widest uppercase">Sovereign Codebase</div>
            </div>
        </div>
    );
};