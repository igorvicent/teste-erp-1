
import React, { useState, useMemo } from 'react';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectsProps {
  onSelectProject: (p: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState('TODOS');
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(p => {
      const matchesFilter = filter === 'TODOS' || 
                           (filter === 'RESIDENCIAL' && p.name.includes('Residencial')) ||
                           (filter === 'COMERCIAL' && p.name.includes('Comercial'));
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           p.location.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex flex-col gap-1 py-2">
        <h2 className="text-2xl font-extrabold tracking-tight">Meus Projetos</h2>
        <p className="text-sm text-slate-500 font-medium">{filteredProjects.length} obras encontradas</p>
      </header>

      <div className="flex flex-col gap-4 sticky top-0 bg-background-light dark:bg-background-dark py-2 z-10">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar obra por nome ou local..." 
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-dark border-none rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['TODOS', 'RESIDENCIAL', 'COMERCIAL', 'INDUSTRIAL'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filter === cat ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-surface-dark text-slate-500 border border-slate-200 dark:border-slate-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => onSelectProject(project)} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 opacity-60">
            <span className="material-symbols-outlined text-6xl mb-2">search_off</span>
            <p className="font-bold">Nenhuma obra encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const statusStyles = {
    EM_DIA: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    ATRASO: 'bg-red-50 text-red-600 border-red-100',
    ATENCAO: 'bg-amber-50 text-amber-600 border-amber-100'
  };

  return (
    <div onClick={onClick} className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-all">
      <div className="relative h-40">
        <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${statusStyles[project.status]}`}>
          {project.status.replace('_', ' ')}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-xs">location_on</span>
            {project.location}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
              <span>Físico</span>
              <span className="text-slate-700 dark:text-white">{project.physicalProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${project.physicalProgress}%` }}></div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
              <span>Financeiro</span>
              <span className="text-slate-700 dark:text-white">{project.financialProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${project.financialProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
