import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  DollarSign, 
  Settings, 
  Plus, 
  Tag,
  History
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onChangePage }) => {
  const { user } = useAuth();
  
  if (!user) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'expenses', label: 'Expenses', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'add-expense', label: 'Add Expense', icon: <Plus className="h-5 w-5" /> },
    { id: 'categories', label: 'Categories', icon: <Tag className="h-5 w-5" /> },
    { id: 'budgets', label: 'Budgets', icon: <PieChart className="h-5 w-5" /> },
    { id: 'history', label: 'History', icon: <History className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4 w-64">
      <div className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activePage === item.id
                ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            onClick={() => onChangePage(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;