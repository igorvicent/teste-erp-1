
import { Project, CashFlow, FinancialItem, Budget, WorkOrder, Team, Entity, Material } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'OB-2024-001',
    name: 'Residencial Horizonte',
    location: 'Jardins, São Paulo - SP',
    physicalProgress: 45,
    financialProgress: 60,
    status: 'ATRASO',
    engineer: 'Eng. Roberto M.',
    imageUrl: 'https://picsum.photos/seed/horizonte/400/300'
  },
  {
    id: 'OB-2024-002',
    name: 'Complexo Comercial Alpha',
    location: 'Centro, Curitiba - PR',
    physicalProgress: 72,
    financialProgress: 68,
    status: 'EM_DIA',
    engineer: 'Eng. Sarah L.',
    imageUrl: 'https://picsum.photos/seed/alpha/400/300'
  }
];

export const MOCK_ENTITIES: Entity[] = [
  { id: 'ENT-001', type: 'CLIENTE', name: 'Ana Paula Silva', document: '123.456.789-00', email: 'ana@email.com', phone: '(11) 98888-7777' },
  { id: 'ENT-002', type: 'FORNECEDOR', name: 'Cimento Votorantim', document: '00.123.456/0001-99', email: 'vendas@votorantim.com', phone: '0800 701 4050' },
  { id: 'ENT-003', type: 'PRESTADOR', name: 'Equipe do Gesso Silva', document: '44.555.666/0001-00', email: 'silva@gesso.com', phone: '(11) 97777-6666' }
];

export const MOCK_MATERIALS: Material[] = [
  { id: 'MAT-001', name: 'Cimento CP-II', unit: 'Saco 50kg', stock: 150, minStock: 50, category: 'Básico' },
  { id: 'MAT-002', name: 'Aço CA-50 10mm', unit: 'Vara 12m', stock: 20, minStock: 30, category: 'Estrutura' },
  { id: 'MAT-003', name: 'Tinta Acrílica Branca', unit: 'Lata 18L', stock: 12, minStock: 5, category: 'Acabamento' }
];

export const MOCK_BUDGETS: Budget[] = [
  { id: 'ORC-101', projectName: 'Reforma Loft Jardins', clientName: 'Ana Paula Silva', totalValue: 85000, status: 'PENDENTE', items: [] },
  { id: 'ORC-102', projectName: 'Pintura Galpão Alpha', clientName: 'Logística S.A.', totalValue: 124000, status: 'APROVADO', items: [] }
];

export const MOCK_TEAMS: Team[] = [
  { id: 'TEAM-A', name: 'Equipe Alvenaria', specialty: 'Estrutura' },
  { id: 'TEAM-B', name: 'Equipe Acabamento', specialty: 'Pintura/Piso' }
];

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  { id: 'OS-5001', budgetId: 'ORC-102', projectName: 'Pintura Galpão Alpha', teamId: 'TEAM-B', status: 'EM_EXECUCAO', tasks: [] }
];

export const MOCK_CASH_FLOW: CashFlow[] = [
  { month: 'Mai', budgeted: 1000, actual: 800 },
  { month: 'Jun', budgeted: 1200, actual: 1100 },
  { month: 'Jul', budgeted: 900, actual: 1050 }
];

export const MOCK_FINANCIALS: FinancialItem[] = [
  { id: '1', description: 'Cimento CP-II', category: 'Material', value: 1500, dueDate: '2024-10-20', project: 'Residencial Jardins', status: 'OVERDUE' }
];
