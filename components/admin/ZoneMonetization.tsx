
import React, { useState } from 'react';
import { CreditCard, Crown, Gift, DollarSign, Edit3, Trash2, Plus } from 'lucide-react';
import { SystemSettings, SubscriptionPlan, CreditPackage } from '../../types';

interface Props {
  settings: SystemSettings;
  onUpdateSettings: (s: SystemSettings) => void;
}

export const ZoneMonetization: React.FC<Props> = ({ settings, onUpdateSettings }) => {
  const [activeTab, setActiveTab] = useState<'PLANS' | 'PACKAGES' | 'OFFERS'>('PLANS');

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-xl text-green-600"><DollarSign size={24} /></div>
          Monetization
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
           {[
             { id: 'PLANS', label: 'Plans', icon: <Crown size={14} /> },
             { id: 'PACKAGES', label: 'Credits', icon: <CreditCard size={14} /> },
             { id: 'OFFERS', label: 'Offers', icon: <Gift size={14} /> }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow text-green-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
               {tab.icon} {tab.label}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'PLANS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.subscriptionPlans?.map((plan, idx) => (
                  <div key={plan.id} className="border rounded-xl p-4 relative group hover:border-green-400 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-2">
                          <div>
                              <h4 className="font-bold text-slate-800">{plan.name}</h4>
                              <p className="text-xs text-slate-500">{plan.duration}</p>
                          </div>
                          {plan.popular && <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">POPULAR</span>}
                      </div>
                      <div className="space-y-1 mb-4">
                          <p className="text-sm font-bold text-blue-600 flex justify-between">Basic: <span>₹{plan.basicPrice}</span></p>
                          <p className="text-sm font-bold text-purple-600 flex justify-between">Ultra: <span>₹{plan.ultraPrice}</span></p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="flex-1 bg-slate-100 text-slate-600 py-1.5 rounded text-xs font-bold hover:bg-slate-200">Edit</button>
                      </div>
                  </div>
              ))}
              <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:text-green-600 hover:border-green-300 hover:bg-green-50 transition-all">
                  <Plus size={24} />
                  <span className="text-xs font-bold mt-2">Add New Plan</span>
              </button>
          </div>
      )}

      {activeTab === 'PACKAGES' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {settings.packages?.map(pkg => (
                  <div key={pkg.id} className="border rounded-xl p-4 text-center">
                      <p className="font-bold text-slate-700">{pkg.name}</p>
                      <p className="text-xs text-slate-500 mb-2">{pkg.credits} Credits</p>
                      <p className="text-xl font-black text-green-600">₹{pkg.price}</p>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};
