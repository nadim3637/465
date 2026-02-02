
import React from 'react';
import { StudyTimer } from './StudyTimer';
import { LiveProgressRing } from './LiveProgressRing';
import { AiTutorCard } from './AiTutorCard';
import { ChevronUp, Gift, Bell, Crown, Zap, Layout, Trophy } from 'lucide-react';

// Layer 1: HERO (Focus Mode)
interface HeroProps {
  dailyStudySeconds: number;
  dailyTargetSeconds: number;
  onSetTarget: (s: number) => void;
  weeklyData: number[];
  streak: number;
  onOpenAi: () => void;
  onContinueLearning: () => void;
  onDailyChallenge: () => void;
}

export const HeroLayer: React.FC<HeroProps> = ({ 
  dailyStudySeconds, dailyTargetSeconds, onSetTarget, weeklyData, streak, onOpenAi, onContinueLearning, onDailyChallenge 
}) => {
  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-4 pb-20">
      <StudyTimer 
        dailyStudySeconds={dailyStudySeconds} 
        dailyTargetSeconds={dailyTargetSeconds} 
        onSetTarget={onSetTarget} 
      />
      
      <LiveProgressRing 
        dailyStudySeconds={dailyStudySeconds} 
        weeklyData={weeklyData} 
        streak={streak} 
      />
      
      <AiTutorCard onOpenAi={onOpenAi} />

      <div className="grid grid-cols-2 gap-3 mt-2">
        <button 
          onClick={onContinueLearning}
          className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
        >
           <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
             <Zap size={20} fill="currentColor" />
           </div>
           <span className="text-xs font-black text-slate-700 uppercase">Continue</span>
        </button>

        <button 
          onClick={onDailyChallenge}
          className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
        >
           <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
             <Trophy size={20} fill="currentColor" />
           </div>
           <span className="text-xs font-black text-slate-700 uppercase">Challenge</span>
        </button>
      </div>

      <div className="flex justify-center mt-4 opacity-50 animate-bounce">
         <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explore More</span>
            <ChevronUp size={20} className="text-slate-400" />
         </div>
      </div>
    </div>
  );
};

// Layer 2: SMART SLIDE (Explore)
interface SmartSlideProps {
  children: React.ReactNode;
}

export const SmartSlideLayer: React.FC<SmartSlideProps> = ({ children }) => {
  return (
    <div className="bg-slate-50 min-h-screen rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-slate-100 relative -mt-6 pt-8 px-4 pb-32">
       <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
       <div className="space-y-6">
         {children}
       </div>
    </div>
  );
};
