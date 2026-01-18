
import React from 'react';
import { MOCK_FINANCIALS } from '../constants';

const Financial: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex justify-between items-center py-2 sticky top-0 bg-background-light dark:bg-background-dark z-20">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Financeiro</h2>
          <p className="text-sm text-slate-500 font-medium">Contas a Pagar</p>
        </div>
        <button className="h-10 w-10 bg-primary text-white rounded-full shadow-lg flex items-center justify-center">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/20">
          <p className="text-[10px] font-bold text-red-500 uppercase">Total Vencido</p>
          <p className="text-xl font-extrabold text-red-600 mt-1">R$ 4.250,00</p>
          <p className="text-[10px] font-bold text-red-400 mt-1">3 contas</p>
        </div>
        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Vence Hoje</p>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">R$ 1.200,00</p>
          <p className="text-[10px] font-bold text-primary mt-1">2 contas</p>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-sm uppercase text-slate-400 tracking-widest">Próximos Vencimentos</h3>
        {MOCK_FINANCIALS.map(item => (
          <div 
            key={item.id} 
            className={`bg-white dark:bg-surface-dark p-4 rounded-2xl border-l-4 shadow-sm border-y border-r border-slate-100 dark:border-slate-800 flex items-center gap-4 ${item.status === 'OVERDUE' ? 'border-l-red-500' : 'border-l-primary'}`}
          >
            <div className={`p-2.5 rounded-xl ${item.category === 'Material' ? 'bg-orange-50 text-orange-600' : (item.category === 'Serviço' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600')}`}>
              <span className="material-symbols-outlined text-[20px]">
                {item.category === 'Material' ? 'inventory_2' : (item.category === 'Serviço' ? 'engineering' : 'local_shipping')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">{item.description}</h4>
              <p className="text-[10px] text-slate-500 font-medium">{item.project}</p>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold">
                <span className={`px-2 py-0.5 rounded-full ${item.status === 'OVERDUE' ? 'bg-red-50 text-red-600' : 'bg-primary/10 text-primary'}`}>
                  {item.status === 'OVERDUE' ? `Vencido ${item.dueDate}` : `Vence ${item.dueDate}`}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 dark:text-white">R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Financial;
