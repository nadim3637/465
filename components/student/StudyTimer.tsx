
import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, Edit3 } from 'lucide-react';

interface Props {
  dailyStudySeconds: number;
  dailyTargetSeconds: number;
  onSetTarget: (seconds: number) => void;
}

export const StudyTimer: React.FC<Props> = ({ dailyStudySeconds, dailyTargetSeconds, onSetTarget }) => {
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    // const s = secs % 60;
    return `${h}h ${m}m`;
  };

  const progress = Math.min((dailyStudySeconds / dailyTargetSeconds) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 rounded-3xl shadow-lg text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-bold opacity-90 flex items-center gap-2">
              <Timer size={16} /> Today's Study Goal
            </h3>
            <p className="text-2xl font-black mt-1">{formatTime(dailyStudySeconds)} <span className="text-sm opacity-70 font-medium">/ {formatTime(dailyTargetSeconds)}</span></p>
          </div>
          <div className="w-12 h-12 relative flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-blue-800" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white transition-all duration-1000 ease-out" strokeDasharray={126} strokeDashoffset={126 - (126 * progress) / 100} strokeLinecap="round" />
             </svg>
             <span className="absolute text-[10px] font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="bg-black/20 p-1 rounded-xl flex justify-between gap-1 backdrop-blur-sm">
           {[1800, 3600, 7200].map(s => (
             <button 
               key={s}
               onClick={() => onSetTarget(s)}
               className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${dailyTargetSeconds === s ? 'bg-white text-blue-600 shadow-sm' : 'text-white/70 hover:bg-white/10'}`}
             >
               {s / 60 >= 60 ? `${s/3600}h` : `${s/60}m`}
             </button>
           ))}
           <button 
             onClick={() => setShowCustom(!showCustom)}
             className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${!([1800, 3600, 7200].includes(dailyTargetSeconds)) ? 'bg-white text-blue-600 shadow-sm' : 'text-white/70 hover:bg-white/10'}`}
           >
             <Edit3 size={14} className="mx-auto" />
           </button>
        </div>

        {showCustom && (
          <div className="mt-2 flex gap-2 animate-in slide-in-from-top-2">
            <input 
              type="number" 
              placeholder="Minutes" 
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 p-2 rounded-lg text-slate-900 text-xs font-bold outline-none"
            />
            <button 
              onClick={() => {
                const mins = parseInt(customInput);
                if (mins > 0) {
                  onSetTarget(mins * 60);
                  setShowCustom(false);
                }
              }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-xs font-black"
            >
              SET
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
