
import React from 'react';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  onOpenAi: () => void;
}

export const AiTutorCard: React.FC<Props> = ({ onOpenAi }) => {
  return (
    <div 
      onClick={onOpenAi}
      className="bg-slate-900 mt-4 rounded-3xl p-6 relative overflow-hidden cursor-pointer group border border-slate-800 shadow-xl"
    >
      {/* Animated Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/30 rounded-full blur-[50px] group-hover:bg-purple-500/40 transition-all animate-pulse"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
               <Sparkles size={10} /> AI Tutor
             </span>
          </div>
          <h3 className="text-2xl font-black text-white leading-tight mb-1">
            Ask anything.<br/>
            <span className="text-purple-400">AI will teach you.</span>
          </h3>
          <p className="text-slate-400 text-xs font-medium mt-2">Instant doubts solving & personalized notes.</p>
        </div>
        
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
           <Bot size={32} className="text-white" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-2 transition-transform">
         Start Learning <ArrowRight size={14} />
      </div>
    </div>
  );
};
