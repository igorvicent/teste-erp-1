
import React from 'react';

const Fiscal: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Gestão Fiscal</h2>
        <button className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined">filter_alt</span>
        </button>
      </header>

      {/* Segmented Control */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button className="flex-1 py-2 text-xs font-bold rounded-lg bg-white dark:bg-surface-dark text-primary shadow-sm">Pendentes</button>
        <button className="flex-1 py-2 text-xs font-bold rounded-lg text-slate-500">Histórico</button>
      </div>

      {/* Pending List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Medições Aprovadas</h3>
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">3 pendentes</span>
        </div>

        {[
          { project: 'Residencial Jardins', val: 12500, med: '#5', ct: '004/23' },
          { project: 'Edifício Horizonte', val: 45000, med: '#2', ct: '012/23' },
          { project: 'Centro Comercial Norte', val: 8200, med: '#1', ct: '009/23' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{item.project}</p>
                <h4 className="text-xl font-bold">R$ {item.val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                <p className="text-xs text-slate-500 mt-1">Contrato: {item.ct} • Medição {item.med}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img src={`https://picsum.photos/seed/${idx}/100`} className="w-full h-full object-cover" alt="proj" />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Emitir NFS-e
              </button>
              <button className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fiscal;
