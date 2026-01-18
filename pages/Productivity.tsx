
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const Productivity: React.FC = () => {
  const [viewMode, setViewMode] = useState<'EQUIPE' | 'OS'>('EQUIPE');

  const teamData = [
    { name: 'Eqp. Alvenaria', planned: 750, actual: 820 },
    { name: 'Eqp. Acabamento', planned: 1100, actual: 950 },
    { name: 'Eqp. Elétrica', planned: 600, actual: 680 },
  ];

  const osData = [
    { name: 'OS-5001', efficiency: 94 },
    { name: 'OS-4982', efficiency: 78 },
    { name: 'OS-5012', efficiency: 105 },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex justify-between items-center py-2">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Produtividade</h2>
          <p className="text-sm text-slate-500">Eficiência por Equipe e O.S.</p>
        </div>
      </header>

      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button 
          onClick={() => setViewMode('EQUIPE')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${viewMode === 'EQUIPE' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
        >
          Por Equipe
        </button>
        <button 
          onClick={() => setViewMode('OS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${viewMode === 'OS' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
        >
          Por O.S.
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Eficiência Média</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">92%</p>
          <div className="mt-2 text-[10px] font-bold text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +3.2%
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase">H.H. Total</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">1,450h</p>
          <p className="text-[10px] font-bold text-slate-400 mt-1">Neste mês</p>
        </div>
      </div>

      {viewMode === 'EQUIPE' ? (
        <section className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-400">Horas HH por Equipe</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamData} margin={{ left: -20, right: 20 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="planned" name="Planejado" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Realizado" fill="#ed8213" radius={[4, 4, 0, 0]} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      ) : (
        <section className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-400">Eficiência (%) por Ordem de Serviço</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={osData} margin={{ left: -20, right: 20 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="efficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary">analytics</span>
          <h4 className="text-xs font-bold text-primary uppercase">Diagnóstico de Produtividade</h4>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          A Equipe de Acabamento apresenta 14% de desvio negativo. Recomenda-se revisar a OS-4982 para identificar gargalos operacionais ou falta de material.
        </p>
      </div>
    </div>
  );
};

export default Productivity;
