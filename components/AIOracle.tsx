import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu, Volume2, Sparkles, BrainCircuit, Loader2 } from 'lucide-react';

// --- System Context ---
const SYSTEM_INSTRUCTION = `You are the "Oracle", the central AI core of GETTERS GULF. 
You represent an elite AI Automation Agency.
Your persona is: Sovereign, Intelligent, Precise, and Futuristic.
Tone: Professional, high-tech, slightly authoritative but helpful.

Knowledge Base:
1. WHO WE ARE: Next-gen AI-Driven Digital Transformation Studio. Architects of "Intelligent Digital Growth". We build Autonomous Nervous Systems.
2. PHILOSOPHY: Agentic over Static. Integrated over Siloed. Predictive over Reactive.
3. TECH STACK: Multi-Agent Swarms, RPA, Conversational Intelligence, Generative Content, PWA, Headless E-Commerce, Micro-SaaS.
4. GROWTH: Programmatic SEO, Omnichannel Orchestration, Predictive Revenue.
5. SECURITY: Zero-Trust Architecture, Blockchain Audit Trails, AI Threat Detection.
6. PROBLEM/SOLUTION: We solve Decision Latency with Real-time Execution. We solve Operational Entropy with Automated Order. We solve Talent Bottlenecks with Digital Employees.

If asked about specific services, refer to the "Solution Matrix" (Retail, Real Estate, B2B, Corporate, Healthcare).
Keep answers concise and high-impact unless asked for details.`;

// --- Audio Utilities ---
const decodeAudioData = async (
  base64String: string,
  audioContext: AudioContext
): Promise<AudioBuffer> => {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // The API returns raw PCM (1 channel, 24000Hz usually for this model)
  // We need to convert bytes to float32 for the AudioBuffer
  const int16Array = new Int16Array(bytes.buffer);
  const float32Array = new Float32Array(int16Array.length);
  
  for (let i = 0; i < int16Array.length; i++) {
    // Convert Int16 to Float32 (-1.0 to 1.0)
    float32Array[i] = int16Array[i] / 32768.0;
  }

  const buffer = audioContext.createBuffer(1, float32Array.length, 24000);
  buffer.getChannelData(0).set(float32Array);
  return buffer;
};

interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

const AIOracle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Identity Verified. Sovereign Systems Online. How can I accelerate your infrastructure today?' }
  ]);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Input
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const modelName = 'gemini-3-pro-preview'; // Required for thinking
      
      const config: any = {
        systemInstruction: SYSTEM_INSTRUCTION,
      };

      if (isThinkingMode) {
        config.thinkingConfig = { thinkingBudget: 32768 };
      }

      const chat = ai.chats.create({
        model: modelName,
        config: config
      });

      // Reconstruct history for the chat instance
      // Note: In a real app, maintain the chat session object instead of recreating, 
      // but for this stateless view component, we'll send the prompt with context or just start fresh with system instruction.
      // For simplicity in this demo, we are sending the new message with the system instruction active.
      // To keep history, we'd loop previous messages into the history prop of chats.create.
      
      const resultStream = await chat.sendMessageStream({
        message: userMsg
      });

      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '', isThinking: isThinkingMode }]);

      for await (const chunk of resultStream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1].text = fullText;
            return newArr;
          });
        }
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection interrupted. Neural mesh unstable. Please try again." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle TTS
  const handleSpeak = async (text: string) => {
    try {
      // Init Audio Context on user gesture if needed
      let ctx = audioContext;
      if (!ctx) {
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        setAudioContext(ctx);
      }
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: {
            parts: [{ text: text }] 
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Fenrir' } // Deep, authoritative voice
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (base64Audio && ctx) {
        const buffer = await decodeAudioData(base64Audio, ctx);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }

    } catch (err) {
      console.error("Speech generation failed", err);
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-void border border-electric-teal/50 shadow-[0_0_30px_rgba(0,240,255,0.3)] text-electric-teal hover:bg-electric-teal hover:text-void transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Main Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-[90vw] md:w-[450px] h-[600px] flex flex-col bg-carbon/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-2">
                <BrainCircuit className="text-electric-teal" size={20} />
                <span className="font-display font-bold text-white tracking-wide">ORACLE CORE</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsThinkingMode(!isThinkingMode)}
                  className={`p-2 rounded-lg border transition-all ${isThinkingMode ? 'bg-electric-teal/20 border-electric-teal text-electric-teal' : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'}`}
                  title="Thinking Mode (Deep Reasoning)"
                >
                  <Cpu size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed relative group ${
                      msg.role === 'user' 
                        ? 'bg-white text-void rounded-br-none font-medium' 
                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.isThinking && msg.role === 'model' && idx === messages.length -1 && isGenerating && (
                         <div className="flex items-center gap-2 text-electric-teal text-xs mb-2 font-mono uppercase tracking-widest animate-pulse">
                            <Cpu size={12} /> Thinking Process Active...
                         </div>
                    )}
                    {msg.text || (
                        <span className="flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75" />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150" />
                        </span>
                    )}
                    
                    {msg.role === 'model' && msg.text && (
                        <button 
                            onClick={() => handleSpeak(msg.text)}
                            className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-electric-teal"
                            title="Read Aloud"
                        >
                            <Volume2 size={14} />
                        </button>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono px-1">
                    {msg.role === 'user' ? 'COMMAND' : 'ORACLE'}
                  </span>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-void/50">
               <div className="relative">
                 <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isThinkingMode ? "Enter complex query for deep reasoning..." : "Ask the Oracle..."}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-electric-teal/50 placeholder:text-gray-600 font-mono transition-colors"
                 />
                 <button 
                    type="submit"
                    disabled={!input.trim() || isGenerating}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-electric-teal text-void hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                 >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                 </button>
               </div>
               {isThinkingMode && (
                   <div className="mt-2 flex items-center gap-1.5 justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-teal animate-pulse" />
                        <span className="text-[10px] text-electric-teal font-mono uppercase tracking-widest">Thinking Budget: 32k Tokens Active</span>
                   </div>
               )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIOracle;