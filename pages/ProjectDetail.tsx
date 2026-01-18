
import React, { useState, useEffect } from 'react';
import { Project, WorkOrder } from '../types';
import { getProjectSummary } from '../geminiService';
import { MOCK_WORK_ORDERS } from '../constants';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState<'RESUMO' | 'DIARIO' | 'CRONOGRAMA'>('RESUMO');
  const [aiSummary, setAiSummary] = useState<string | undefined>("Gerando análise executiva...");
  const [loadingAi, setLoadingAi] = useState(false);
  
  // Daily Log State
  const [logText, setLogText] = useState('');
  const [selectedOS, setSelectedOS] = useState<string>('');
  const [workers, setWorkers] = useState('0');
  const [hours, setHours] = useState('8');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingAi(true);
      const summary = await getProjectSummary(project);
      setAiSummary(summary);
      setLoadingAi(false);
    };
    fetchSummary();
  }, [project.id]);

  const handleFinishLog = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLogText('');
      alert(`Apontamento realizado para a OS: ${selectedOS}. Horas Totais: ${parseInt(workers) * parseInt(hours)}h`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="sticky top-0 z-30 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 truncate">{project.name}</h2>
      </div>

      <div className="bg-white dark:bg-surface-dark px-4 py-2 border-b border-slate-200 dark:border-slate-800 sticky top-[57px] z-30">
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['RESUMO', 'DIARIO', 'CRONOGRAMA'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {activeTab === 'RESUMO' && (
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-5 rounded-2xl border border-primary/20 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary">psychology</span>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Insight Executivo</h3>
              </div>
              {loadingAi ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-primary/20 rounded w-full"></div>
                  <div className="h-3 bg-primary/20 rounded w-5/6"></div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">"{aiSummary}"</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatItem label="Físico" value={`${project.physicalProgress}%`} icon="engineering" color="text-primary" />
              <StatItem label="Financeiro" value={`${project.financialProgress}%`} icon="payments" color="text-emerald-500" />
            </div>
          </div>
        )}

        {activeTab === 'DIARIO' && (
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg">Apontamento de Obra</h3>
            
            <section className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Vincular Ordem de Serviço (O.S.)</label>
                <select 
                  value={selectedOS}
                  onChange={(e) => setSelectedOS(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm p-3 focus:ring-primary"
                >
                  <option value="">Selecione uma O.S. ativa</option>
                  {MOCK_WORK_ORDERS.map(os => (
                    <option key={os.id} value={os.id}>{os.id} - {os.projectName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Nº de Colaboradores</label>
                  <input 
                    type="number" 
                    value={workers}
                    onChange={(e) => setWorkers(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm p-3 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Horas / Pessoa</label>
                  <input 
                    type="number" 
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm p-3 focus:ring-primary"
                  />
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Relatório de Atividades</label>
              <textarea 
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                className="w-full h-32 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm focus:ring-primary focus:border-primary"
                placeholder="Descreva o que foi realizado hoje..."
              ></textarea>
              <button 
                onClick={handleFinishLog}
                disabled={isSaving || !logText || !selectedOS}
                className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${isSaving || !logText || !selectedOS ? 'bg-slate-300' : 'bg-primary shadow-primary/20 active:scale-95'}`}
              >
                {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Salvar Apontamento'}
              </button>
            </section>
          </div>
        )}

        {activeTab === 'CRONOGRAMA' && (
          <div className="flex flex-col gap-4">
            <PhaseItem title="Infraestrutura" progress={100} date="01 Out - 15 Out" status="Concluído" color="emerald" />
            <PhaseItem title="Fundações" progress={35} planned={60} date="16 Out - 30 Nov" status="Atrasado" color="amber" />
          </div>
        )}
      </div>
    </div>
  );
};

const StatItem = ({ label, value, icon, color }: any) => (
  <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
    <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${color}`}><span className="material-symbols-outlined text-[20px]">{icon}</span></div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">{label}</p>
      <p className="text-xl font-extrabold leading-none">{value}</p>
    </div>
  </div>
);

const PhaseItem = ({ title, progress, planned, date, status, color }: any) => {
  const colorMap: any = { emerald: 'bg-emerald-500', amber: 'bg-amber-500' };
  return (
    <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h5 className="font-bold text-sm">{title}</h5>
        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{status}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${colorMap[color]}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProjectDetail;
