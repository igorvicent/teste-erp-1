
import React, { useState, useEffect } from 'react';
import { AppView, Project } from './types';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Financial from './pages/Financial';
import Fiscal from './pages/Fiscal';
import ProjectDetail from './pages/ProjectDetail';
import Productivity from './pages/Productivity';
import Budgets from './pages/Budgets';
import Management from './pages/Management';
import Inventory from './pages/Inventory';
import { CameraModal } from './components/CameraModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showSpeedDial, setShowSpeedDial] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (msg: string) => setToast(msg);

  const renderView = () => {
    switch (currentView) {
      case 'DASHBOARD': return <Dashboard onSelectProject={(p) => { setSelectedProject(p); setCurrentView('PROJECT_DETAIL'); }} />;
      case 'PROJECTS': return <Projects onSelectProject={(p) => { setSelectedProject(p); setCurrentView('PROJECT_DETAIL'); }} />;
      case 'BUDGETS': return <Budgets showToast={showToast} />;
      case 'FINANCIAL': return <Financial />;
      case 'MANAGEMENT': return <Management showToast={showToast} />;
      case 'INVENTORY': return <Inventory showToast={showToast} />;
      case 'PRODUCTIVITY': return <Productivity />;
      case 'PROJECT_DETAIL':
        return selectedProject ? (
          <ProjectDetail project={selectedProject} onBack={() => setCurrentView('PROJECTS')} />
        ) : <Projects onSelectProject={(p) => { setSelectedProject(p); setCurrentView('PROJECT_DETAIL'); }} />;
      default: return <Dashboard onSelectProject={(p) => { setSelectedProject(p); setCurrentView('PROJECT_DETAIL'); }} />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark font-body text-slate-900 dark:text-white transition-colors duration-300">
      
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in zoom-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          {toast}
        </div>
      )}

      {showCamera && (
        <CameraModal 
          onClose={() => setShowCamera(false)} 
          onSave={() => { setShowCamera(false); showToast("Foto salva no Diário!"); }} 
        />
      )}

      {/* Speed Dial Menu */}
      {showSpeedDial && (
        <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm flex items-end justify-center pb-32 px-6" onClick={() => setShowSpeedDial(false)}>
          <div className="bg-white dark:bg-surface-dark w-full max-w-sm rounded-3xl p-6 grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
            <QuickAction icon="engineering" label="Nova Obra" color="bg-orange-500" onClick={() => { setCurrentView('PROJECTS'); setShowSpeedDial(false); }} />
            <QuickAction icon="person_add" label="Novo Cliente" color="bg-blue-500" onClick={() => { setCurrentView('MANAGEMENT'); setShowSpeedDial(false); }} />
            <QuickAction icon="inventory" label="Novo Material" color="bg-emerald-500" onClick={() => { setCurrentView('INVENTORY'); setShowSpeedDial(false); }} />
            <QuickAction icon="receipt" label="Novo Orçamento" color="bg-purple-500" onClick={() => { setCurrentView('BUDGETS'); setShowSpeedDial(false); }} />
            <QuickAction icon="photo_camera" label="Foto Obra" color="bg-slate-700" onClick={() => { setShowCamera(true); setShowSpeedDial(false); }} />
            <QuickAction icon="close" label="Fechar" color="bg-slate-200 text-slate-500" onClick={() => setShowSpeedDial(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {renderView()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-gray-800 shadow-lg px-2 pt-2 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <NavButton icon="dashboard" label="Home" active={currentView === 'DASHBOARD'} onClick={() => setCurrentView('DASHBOARD')} />
          <NavButton icon="engineering" label="Obras" active={currentView === 'PROJECTS' || currentView === 'PROJECT_DETAIL'} onClick={() => setCurrentView('PROJECTS')} />
          
          <button 
            className={`relative -top-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/40 transform transition-all ${showSpeedDial ? 'rotate-45 bg-slate-900' : ''}`}
            onClick={() => setShowSpeedDial(!showSpeedDial)}
          >
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>

          <NavButton icon="group" label="Gestão" active={currentView === 'MANAGEMENT'} onClick={() => setCurrentView('MANAGEMENT')} />
          <NavButton icon="inventory_2" label="Estoque" active={currentView === 'INVENTORY'} onClick={() => setCurrentView('INVENTORY')} />
        </div>
      </nav>
    </div>
  );
};

const QuickAction = ({ icon, label, color, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 p-4 rounded-2xl active:scale-95 transition-transform bg-slate-50 dark:bg-slate-800">
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white shadow-lg`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">{label}</span>
  </button>
);

const NavButton = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 w-16 transition-colors duration-200 ${active ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
    <span className={`material-symbols-outlined text-2xl ${active ? 'filled' : ''}`}>{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

export default App;
