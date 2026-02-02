
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Activity } from 'lucide-react';

interface Props {
  // Add props for data
  userCount: number;
  activeCount: number;
}

export const ZoneAnalytics: React.FC<Props> = ({ userCount, activeCount }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><BarChart3 size={24} /></div>
        <h2 className="text-2xl font-black text-slate-800">Analytics & Logs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Users size={14}/> Total Users</p>
              <p className="text-3xl font-black text-slate-800 mt-2">{userCount}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <p className="text-xs font-bold text-green-600 uppercase flex items-center gap-2"><Activity size={14}/> Active Now</p>
              <p className="text-3xl font-black text-green-800 mt-2">{activeCount}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <p className="text-xs font-bold text-purple-600 uppercase flex items-center gap-2"><Clock size={14}/> Avg Session</p>
              <p className="text-3xl font-black text-purple-800 mt-2">24m</p>
          </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 text-center text-slate-400 border-2 border-dashed border-slate-200">
          <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
          <p className="font-bold">Detailed Charts Coming Soon</p>
          <p className="text-xs mt-2">Retention graphs and detailed breakdown will be available here.</p>
      </div>
    </div>
  );
};
