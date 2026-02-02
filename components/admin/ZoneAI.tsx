
import React, { useState } from 'react';
import { BrainCircuit, Bot, Activity, Settings, Save } from 'lucide-react';
import { SystemSettings } from '../../types';

interface Props {
  settings: SystemSettings;
  onUpdateSettings: (s: SystemSettings) => void;
  apiStats: any;
}

export const ZoneAI: React.FC<Props> = ({ settings, onUpdateSettings, apiStats }) => {
  const [activeTab, setActiveTab] = useState<'CONFIG' | 'LOGS' | 'PILOT'>('CONFIG');

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600"><BrainCircuit size={24} /></div>
          AI & Automation
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {[
             { id: 'CONFIG', label: 'Settings', icon: <Settings size={14} /> },
             { id: 'PILOT', label: 'Auto-Pilot', icon: <Bot size={14} /> },
             { id: 'LOGS', label: 'Logs', icon: <Activity size={14} /> }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
               {tab.icon} {tab.label}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'CONFIG' && (
          <div className="space-y-6">
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-4">Groq API Keys</h4>
                  <textarea 
                      className="w-full p-4 rounded-xl border border-indigo-200 text-xs font-mono h-32"
                      placeholder="Paste keys here (comma separated)"
                      value={settings.groqApiKeys?.join(', ') || ''}
                      onChange={e => onUpdateSettings({...settings, groqApiKeys: e.target.value.split(',').map(k => k.trim())})}
                  />
                  <p className="text-[10px] text-indigo-400 mt-2">Multiple keys allow rotation and higher rate limits.</p>
              </div>
              
              <div className="flex justify-end">
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-indigo-700">
                      <Save size={18} /> Save Config
                  </button>
              </div>
          </div>
      )}

      {activeTab === 'PILOT' && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl">
              <Bot size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">AI Pilot Control Center</p>
              <p className="text-xs text-slate-400">Autonomous content generation module.</p>
          </div>
      )}
    </div>
  );
};
