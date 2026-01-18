
import React from 'react';
import { MOCK_MATERIALS } from '../constants';

interface InventoryProps {
  showToast: (m: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ showToast }) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="py-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Almoxarifado</h2>
        <p className="text-sm text-slate-500">Materiais e Insumos em Canteiro</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Itens Críticos</p>
          <p className="text-2xl font-extrabold text-red-500 mt-1">02</p>
          <p className="text-[10px] text-red-400 font-bold mt-1">Abaixo do estoque mín.</p>
        </div>
        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Total em Estoque</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">182</p>
          <p className="text-[10px] text-emerald-500 font-bold mt-1">Valorizado R$ 12k</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_MATERIALS.map(mat => (
          <div key={mat.id} className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined">package_2</span>
              </div>
              <div>
                <h4 className="font-bold text-sm">{mat.name}</h4>
                <p className="text-[10px] text-slate-500">{mat.category} • {mat.unit}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-extrabold ${mat.stock <= mat.minStock ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{mat.stock}</p>
              <div className="mt-1 h-1 w-12 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${mat.stock <= mat.minStock ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((mat.stock/mat.minStock)*50, 100)}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 right-6 flex flex-col gap-3">
        <button onClick={() => showToast("Iniciando Pedido de Compra...")} className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </div>
    </div>
  );
};

export default Inventory;
