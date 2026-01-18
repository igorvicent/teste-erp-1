
import React, { useState } from 'react';
import { MOCK_BUDGETS, MOCK_TEAMS } from '../constants';
import { Budget, Team } from '../types';
import { generateLegalContract } from '../geminiService';

interface BudgetsProps {
  showToast: (m: string) => void;
}

const Budgets: React.FC<BudgetsProps> = ({ showToast }) => {
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [showContract, setShowContract] = useState(false);
  const [contractText, setContractText] = useState('');
  const [loadingContract, setLoadingContract] = useState(false);
  const [showOSCreator, setShowOSCreator] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const handleGenerateContract = async (budget: Budget) => {
    setSelectedBudget(budget);
    setLoadingContract(true);
    setShowContract(true);
    const text = await generateLegalContract(budget);
    setContractText(text || '');
    setLoadingContract(false);
  };

  const handleGenerateOS = (budget: Budget) => {
    setSelectedBudget(budget);
    setShowOSCreator(true);
  };

  const confirmOS = () => {
    showToast(`O.S. Gerada para ${selectedBudget?.projectName}!`);
    setShowOSCreator(false);
    setSelectedBudget(null);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="py-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Orçamentos</h2>
        <p className="text-sm text-slate-500 font-medium">Gestão Comercial e Contratual</p>
      </header>

      <div className="flex flex-col gap-4">
        {MOCK_BUDGETS.map(budget => (
          <div key={budget.id} className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{budget.id}</p>
                <h3 className="font-bold text-lg">{budget.projectName}</h3>
                <p className="text-xs text-slate-500">Cliente: {budget.clientName}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${budget.status === 'PENDENTE' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {budget.status}
              </span>
            </div>

            <div className="border-t border-slate-50 dark:border-slate-800/50 pt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Total: R$ {budget.totalValue.toLocaleString('pt-BR')}</span>
                <button className="text-primary text-xs font-bold">Ver Itens</button>
              </div>

              {budget.status === 'APROVADO' && (
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => handleGenerateOS(budget)}
                    className="flex-1 bg-primary/10 text-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">engineering</span>
                    Gerar O.S.
                  </button>
                  <button 
                    onClick={() => handleGenerateContract(budget)}
                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                    Gerar Contrato
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Contract Modal */}
      {showContract && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white dark:bg-surface-dark w-full max-w-lg max-h-[80vh] rounded-3xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold">Rascunho do Contrato</h3>
              <button onClick={() => setShowContract(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 text-sm leading-relaxed prose dark:prose-invert">
              {loadingContract ? (
                <div className="flex flex-col items-center py-10">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-bold text-slate-500 italic">IA analisando legislação e gerando cláusulas...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap font-serif">{contractText}</div>
              )}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 flex gap-3">
              <button className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm">Editar</button>
              <button 
                onClick={() => { setShowContract(false); showToast("Contrato pronto para assinatura!"); }}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
              >
                Concluir Contrato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OS Creator Modal */}
      {showOSCreator && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white dark:bg-surface-dark w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-lg mb-2">Configurar Execução</h3>
            <p className="text-sm text-slate-500 mb-6">Selecione a equipe responsável para a nova Ordem de Serviço.</p>
            
            <div className="space-y-4 mb-8">
              {MOCK_TEAMS.map(team => (
                <button 
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${selectedTeam === team.id ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedTeam === team.id ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{team.name}</p>
                    <p className="text-[10px] uppercase text-slate-400 font-bold">{team.specialty}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowOSCreator(false)} className="flex-1 py-4 text-slate-500 font-bold text-sm">Cancelar</button>
              <button 
                onClick={confirmOS}
                disabled={!selectedTeam}
                className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                Confirmar O.S.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
