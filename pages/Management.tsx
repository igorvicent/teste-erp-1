
import React, { useState } from 'react';
import { MOCK_ENTITIES } from '../constants';
import { Entity } from '../types';

interface ManagementProps {
  showToast: (m: string) => void;
}

const Management: React.FC<ManagementProps> = ({ showToast }) => {
  const [filter, setFilter] = useState<'CLIENTE' | 'FORNECEDOR' | 'PRESTADOR'>('CLIENTE');

  const filtered = MOCK_ENTITIES.filter(e => e.type === filter);

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="py-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Gestão de Parceiros</h2>
        <p className="text-sm text-slate-500">Clientes, Fornecedores e Equipes</p>
      </header>

      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        {(['CLIENTE', 'FORNECEDOR', 'PRESTADOR'] as const).map(type => (
          <button 
            key={type}
            onClick={() => setFilter(type)}
            className={`flex-1 py-2 text-[10px] font-extrabold rounded-lg transition-all ${filter === type ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
          >
            {type}S
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map(entity => (
          <div key={entity.id} className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4 items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${filter === 'CLIENTE' ? 'bg-blue-50 text-blue-500' : (filter === 'FORNECEDOR' ? 'bg-orange-50 text-orange-500' : 'bg-emerald-50 text-emerald-500')}`}>
              <span className="material-symbols-outlined">{filter === 'CLIENTE' ? 'person' : (filter === 'FORNECEDOR' ? 'store' : 'engineering')}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">{entity.name}</h4>
              <p className="text-[10px] text-slate-500 font-medium">{entity.document}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px]">call</span> {entity.phone}</span>
              </div>
            </div>
            <button className="p-2 text-slate-300"><span className="material-symbols-outlined">more_vert</span></button>
          </div>
        ))}
        
        <button 
          onClick={() => showToast(`Novo ${filter.toLowerCase()} adicionado!`)}
          className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 font-bold text-xs flex items-center justify-center gap-2 active:bg-slate-50 transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          Adicionar {filter}
        </button>
      </div>
    </div>
  );
};

export default Management;
