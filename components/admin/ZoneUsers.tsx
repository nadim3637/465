
import React, { useState } from 'react';
import { User, RecoveryRequest } from '../../types';
import { Search, Edit3, Eye, Trash2, ShieldCheck, Key, Megaphone, Activity, MessageSquare } from 'lucide-react';

interface Props {
  users: User[];
  recoveryRequests: RecoveryRequest[];
  demands: any[];
  onImpersonate: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onEditUser: (user: User) => void;
  onPromoteSubAdmin: (id: string) => void;
  onDemoteSubAdmin: (id: string) => void;
  onApproveRequest: (req: RecoveryRequest) => void;
}

export const ZoneUsers: React.FC<Props> = ({ 
  users, recoveryRequests, demands, onImpersonate, onDeleteUser, onEditUser, onPromoteSubAdmin, onDemoteSubAdmin, onApproveRequest
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ALL' | 'SUB_ADMINS' | 'REQUESTS' | 'DEMANDS'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.includes(searchTerm));

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><ShieldCheck size={24} /></div>
          Users & Access
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {[
             { id: 'ALL', label: 'All Users', icon: <Eye size={14} /> },
             { id: 'SUB_ADMINS', label: 'Admins', icon: <ShieldCheck size={14} /> },
             { id: 'REQUESTS', label: 'Requests', icon: <Key size={14} /> },
             { id: 'DEMANDS', label: 'Demands', icon: <Megaphone size={14} /> }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveSubTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubTab === tab.id ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
               {tab.icon} {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* SEARCH BAR */}
      {(activeSubTab === 'ALL' || activeSubTab === 'SUB_ADMINS') && (
        <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Name, ID or Email..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium" 
            />
        </div>
      )}

      {/* CONTENT */}
      <div className="overflow-hidden">
        {activeSubTab === 'ALL' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500"><tr className="uppercase text-xs"><th className="p-4">User</th><th className="p-4">Credits</th><th className="p-4">Role</th><th className="p-4 text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-slate-50">
                    {filteredUsers.slice(0, 50).map(u => (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4"><p className="font-bold text-slate-800">{u.name}</p><p className="text-xs text-slate-400 font-mono">{u.id}</p></td>
                            <td className="p-4 font-bold text-blue-600">{u.credits}</td>
                            <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>{u.role}</span></td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                {u.role !== 'ADMIN' && (
                                    <>
                                        <button onClick={() => onEditUser(u)} className="p-2 text-slate-400 hover:text-orange-600 bg-slate-50 rounded-lg" title="Edit"><Edit3 size={16} /></button>
                                        <button onClick={() => onImpersonate(u)} className="p-2 text-slate-400 hover:text-green-600 bg-slate-50 rounded-lg" title="Login as User"><Eye size={16} /></button>
                                        <button onClick={() => onDeleteUser(u.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 rounded-lg" title="Delete"><Trash2 size={16} /></button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-center text-xs text-slate-400 mt-4">Showing top 50 results</p>
          </div>
        )}

        {activeSubTab === 'SUB_ADMINS' && (
           <div className="space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-2">
                 <input type="text" placeholder="Enter User ID to Promote" id="promoteId" className="flex-1 p-2 rounded-lg border border-indigo-200 text-sm" />
                 <button onClick={() => {
                    const id = (document.getElementById('promoteId') as HTMLInputElement).value;
                    if(id) onPromoteSubAdmin(id);
                 }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-xs">Promote</button>
              </div>
              {users.filter(u => u.role === 'SUB_ADMIN').map(u => (
                  <div key={u.id} className="p-4 border rounded-xl flex justify-between items-center bg-white shadow-sm">
                      <div>
                          <p className="font-bold text-slate-800">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                      <button onClick={() => onDemoteSubAdmin(u.id)} className="text-red-600 text-xs font-bold hover:underline">Remove Admin</button>
                  </div>
              ))}
           </div>
        )}

        {activeSubTab === 'REQUESTS' && (
            <div className="space-y-3">
               {recoveryRequests.length === 0 && <p className="text-slate-400 text-center py-8">No pending login requests.</p>}
               {recoveryRequests.map(req => (
                   <div key={req.id} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-md transition-all">
                       <div>
                           <p className="font-bold text-slate-800">{req.name}</p>
                           <p className="text-xs text-slate-500">ID: {req.id} • {new Date(req.timestamp).toLocaleString()}</p>
                       </div>
                       {req.status === 'PENDING' ? (
                           <button onClick={() => onApproveRequest(req)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold">Approve</button>
                       ) : (
                           <span className="text-green-600 text-xs font-bold">Approved</span>
                       )}
                   </div>
               ))}
            </div>
        )}

        {activeSubTab === 'DEMANDS' && (
            <div className="space-y-3">
                {demands.length === 0 && <p className="text-slate-400 text-center py-8">No content requests.</p>}
                {demands.map(d => (
                    <div key={d.id} className="p-4 border rounded-xl bg-orange-50/50 border-orange-100">
                        <p className="font-bold text-slate-800 text-sm">{d.details}</p>
                        <div className="flex justify-between mt-2 text-xs text-slate-500">
                            <span>By: {d.userName}</span>
                            <span>{new Date(d.timestamp).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
