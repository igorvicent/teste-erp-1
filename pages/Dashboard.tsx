
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { MOCK_CASH_FLOW, MOCK_PROJECTS } from '../constants';
import { Project } from '../types';

interface DashboardProps {
  onSelectProject: (p: Project) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectProject }) => {
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | 'unsupported'>('prompt');

  useEffect(() => {
    const checkCameraPermission = async () => {
      if (!navigator.permissions || !navigator.permissions.query) {
        setCameraPermission('unsupported');
        return;
      }

      try {
        const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
        setCameraPermission(result.state as any);
        
        result.onchange = () => {
          setCameraPermission(result.state as any);
        };
      } catch (error) {
        // Fallback para navegadores que não suportam query de câmera
        setCameraPermission('prompt');
      }
    };

    checkCameraPermission();
  }, []);

  const getStatusColor = () => {
    switch (cameraPermission) {
      case 'granted': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'denied': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
    }
  };

  const getStatusLabel = () => {
    switch (cameraPermission) {
      case 'granted': return 'Câmera Ativa';
      case 'denied': return 'Câmera Bloqueada';
      case 'unsupported': return 'Câmera Indisponível';
      default: return 'Permissão Câmera';
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <header className="flex justify-between items-start mt-2">
        <div>
          <p className="text-slate-500 text-sm font-medium">Terça, 24 Out</p>
          <h2 className="text-2xl font-bold tracking-tight">Olá, Diretor</h2>
          
          {/* Validação de Permissão do metadata.json */}
          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full mt-2 border border-current/10 ${getStatusColor()}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${cameraPermission === 'granted' ? 'bg-emerald-500' : (cameraPermission === 'denied' ? 'bg-red-500' : 'bg-amber-500')}`}></span>
            <span className="text-[10px] font-bold uppercase tracking-wide">{getStatusLabel()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <IconButton icon="notifications" />
          <IconButton icon="account_circle" />
        </div>
      </header>

      {/* Alerta de Permissão se necessário */}
      {cameraPermission === 'denied' && (
        <div className="bg-red-500 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
          <span className="material-symbols-outlined">no_photography</span>
          <div className="flex-1">
            <p className="text-xs font-bold leading-tight">Acesso à câmera negado.</p>
            <p className="text-[10px] opacity-90">Habilite nas configurações para enviar fotos de diários de obra.</p>
          </div>
          <button className="bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-bold">Ajustes</button>
        </div>
      )}

      {/* KPI Scroll */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4">
        <KPICard 
          title="Fluxo de Caixa" 
          value="R$ 4.5M" 
          trend="+12%" 
          color="bg-gradient-to-br from-primary to-orange-600" 
          icon="account_balance_wallet"
        />
        <KPICard 
          title="Contas a Pagar" 
          value="R$ 320k" 
          trend="Urgente" 
          isAlert
          color="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800" 
          icon="output"
        />
        <KPICard 
          title="Recebíveis" 
          value="R$ 850k" 
          trend="Em dia" 
          color="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800" 
          icon="input"
        />
      </div>

      {/* Chart Section */}
      <section className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Orçado vs. Realizado</h3>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-[10px] font-bold uppercase">
            <button className="px-3 py-1 bg-white dark:bg-slate-700 rounded shadow">Mês</button>
            <button className="px-3 py-1 text-slate-500">Ano</button>
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_CASH_FLOW} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="budgeted" fill="#e2e8f0" radius={[2, 2, 0, 0]} barSize={8} />
              <Bar dataKey="actual" fill="#ed8213" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-[10px] font-bold text-slate-500">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div> ORÇADO</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div> REALIZADO</div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Obras Ativas</h3>
          <button className="text-primary text-sm font-bold">Ver todas</button>
        </div>
        {MOCK_PROJECTS.slice(0, 2).map(project => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4 items-center active:scale-95 transition-transform"
          >
            <img src={project.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt={project.name} />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate text-sm">{project.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{project.location}</p>
              <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${project.physicalProgress}%` }}></div>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${project.status === 'ATRASO' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                {project.status === 'ATRASO' ? 'Atraso' : 'Em dia'}
              </span>
              <p className="text-xs font-bold mt-1">{project.physicalProgress}%</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const IconButton = ({ icon }: { icon: string }) => (
  <button className="p-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 active:bg-slate-50 transition-colors">
    <span className="material-symbols-outlined text-[20px]">{icon}</span>
  </button>
);

const KPICard = ({ title, value, trend, isAlert, color, icon }: any) => (
  <div className={`min-w-[240px] p-5 rounded-2xl shadow-sm relative overflow-hidden ${color}`}>
    <div className={`absolute -right-2 -top-2 opacity-10`}>
      <span className="material-symbols-outlined text-6xl">{icon}</span>
    </div>
    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${color.includes('white') ? 'text-slate-500' : 'text-white/80'}`}>{title}</p>
    <p className={`text-2xl font-bold ${color.includes('white') ? 'text-slate-900 dark:text-white' : 'text-white'}`}>{value}</p>
    <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded w-fit ${isAlert ? 'bg-red-500 text-white' : (color.includes('white') ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-white/20 text-white')}`}>
      {trend}
    </div>
  </div>
);

export default Dashboard;
