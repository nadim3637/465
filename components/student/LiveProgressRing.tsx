
import React from 'react';
import { TrendingUp, Flame, Calendar } from 'lucide-react';

interface Props {
  dailyStudySeconds: number;
  weeklyData: number[]; // Array of seconds for last 7 days
  streak: number;
}

export const LiveProgressRing: React.FC<Props> = ({ dailyStudySeconds, weeklyData, streak }) => {
  const todayProgress = Math.min((dailyStudySeconds / (3 * 3600)) * 100, 100); // Assume 3h default max for visual ring scaling if not passed

  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mt-4">
      <div className="flex items-center justify-between">
        
        {/* Streak */}
        <div className="flex flex-col items-center">
           <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-1">
             <Flame size={20} fill="currentColor" />
           </div>
           <span className="text-lg font-black text-slate-800">{streak}</span>
           <span className="text-[10px] text-slate-400 font-bold uppercase">Day Streak</span>
        </div>

        {/* Weekly Graph (Tiny Bar Chart) */}
        <div className="flex items-end gap-1 h-12">
           {weeklyData.map((val, i) => {
             const h = Math.min((val / (3 * 3600)) * 100, 100);
             return (
               <div key={i} className="w-2 bg-slate-200 rounded-t-sm relative group">
                 <div 
                    className={`absolute bottom-0 left-0 right-0 rounded-t-sm transition-all ${i === 6 ? 'bg-blue-600' : 'bg-blue-300'}`} 
                    style={{ height: `${Math.max(h, 5)}%` }} 
                 />
               </div>
             );
           })}
        </div>

        {/* Today Status */}
        <div className="flex flex-col items-center">
           <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-1">
             <TrendingUp size={20} />
           </div>
           <span className="text-lg font-black text-slate-800">{Math.floor(dailyStudySeconds/60)}m</span>
           <span className="text-[10px] text-slate-400 font-bold uppercase">Today</span>
        </div>

      </div>
    </div>
  );
};
