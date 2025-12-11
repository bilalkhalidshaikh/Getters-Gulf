import React from 'react';
import { Terminal, Twitter, Linkedin } from 'lucide-react';
import { TranslationSchema } from '../types';

interface FooterProps {
  t: TranslationSchema;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="py-12 border-t border-white/5 bg-void">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-white/5 border border-white/10 text-gray-400">
              <Terminal size={18} />
            </div>
            <span className="font-bold tracking-tight text-white font-display">GETTERS GULF</span>
          </div>

          <div className="text-gray-500 text-sm font-mono">
            {t.footer.basedIn}
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <button className="text-xs font-semibold text-void bg-electric-teal px-4 py-2 rounded hover:bg-electric-teal/90 transition-colors">
              {t.footer.request}
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} GETTERS GULF. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;