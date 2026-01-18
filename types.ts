
export type AppView = 'DASHBOARD' | 'PROJECTS' | 'FINANCIAL' | 'FISCAL' | 'CONTRACTS' | 'PRODUCTIVITY' | 'PROJECT_DETAIL' | 'BUDGETS' | 'MANAGEMENT' | 'INVENTORY';

export interface Project {
  id: string;
  name: string;
  location: string;
  physicalProgress: number;
  financialProgress: number;
  status: 'EM_DIA' | 'ATRASO' | 'ATENCAO';
  engineer: string;
  imageUrl: string;
}

export interface Entity {
  id: string;
  type: 'CLIENTE' | 'FORNECEDOR' | 'PRESTADOR';
  name: string;
  document: string; // CPF/CNPJ
  email: string;
  phone: string;
}

export interface Material {
  id: string;
  name: string;
  unit: string;
  stock: number;
  minStock: number;
  category: string;
}

export interface Budget {
  id: string;
  projectName: string;
  clientName: string;
  totalValue: number;
  status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  items: Array<{ description: string; quantity: number; unit: string; price: number }>;
}

export interface WorkOrder {
  id: string;
  budgetId: string;
  projectName: string;
  teamId: string;
  status: 'ABERTA' | 'EM_EXECUCAO' | 'CONCLUIDA';
  tasks: string[];
}

export interface Team {
  id: string;
  name: string;
  specialty: string;
}

export interface FinancialItem {
  id: string;
  description: string;
  category: string;
  value: number;
  dueDate: string;
  project: string;
  status: 'PENDING' | 'OVERDUE' | 'PAID';
}

// Added CashFlow interface to fix the import error in constants.tsx
export interface CashFlow {
  month: string;
  budgeted: number;
  actual: number;
}
