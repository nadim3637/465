
import React, { useState } from 'react';
import { Subject, ContentType } from '../../types';
import { Book, Video, FileText, CheckSquare, Upload, Layers } from 'lucide-react';

// Simplified types for props
interface Props {
  subjects: Record<string, any>; // Using any for simplicity as Subject type is complex
  onSaveSyllabus: () => void;
  // Add other handlers as needed
}

export const ZoneContent: React.FC<Props> = ({ subjects, onSaveSyllabus }) => {
  const [activeTab, setActiveTab] = useState<'SUBJECTS' | 'CHAPTERS' | 'UPLOAD' | 'BULK'>('SUBJECTS');

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <div className="bg-purple-100 p-2 rounded-xl text-purple-600"><Layers size={24} /></div>
          Content Factory
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {[
             { id: 'SUBJECTS', label: 'Subjects', icon: <Book size={14} /> },
             { id: 'CHAPTERS', label: 'Chapters', icon: <FileText size={14} /> },
             { id: 'UPLOAD', label: 'Upload', icon: <Upload size={14} /> },
             { id: 'BULK', label: 'Bulk', icon: <Layers size={14} /> }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
               {tab.icon} {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="font-bold">Content Manager Module</p>
          <p className="text-xs mt-2">This section will be fully integrated in the final assembly.</p>
          <p className="text-[10px] mt-4 opacity-50">Currently verifying component structure...</p>
      </div>
    </div>
  );
};
