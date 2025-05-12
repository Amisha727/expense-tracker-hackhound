import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  DollarSign, 
  Settings, 
  Plus, 
  Tag,
  History,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  activePage: string;
  onChangePage: (page: string) => void;
  onMenuToggle: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  activePage, 
  onChangePage,
  onMenuToggle
}) => {
  const { user, logout } = useAuth();
  
  if (!user || !isOpen) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'expenses', label: 'Expenses', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'add-expense', label: 'Add Expense', icon: <Plus className="h-5 w-5" /> },
    { id: 'categories', label: 'Categories', icon: <Tag className="h-5 w-5" /> },
    { id: 'budgets', label: 'Budgets', icon: <PieChart className="h-5 w-5" /> },
    { id: 'history', label: 'History', icon: <History className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleNavigation = (page: string) => {
    onChangePage(page);
    onMenuToggle();
  };

  const handleLogout = () => {
    logout();
    onMenuToggle();
  };

  return (
    <div className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm md:hidden">
      <div className="fixed inset-y-0 right-0 w-3/4 bg-white dark:bg-slate-800 shadow-xl p-4 overflow-y-auto">
        <div className="mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300 font-medium">Hi, {user.name}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                activePage === item.id
                  ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <button
            className="w-full flex items-center px-3 py-3 mt-4 text-sm font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <span className="mr-3">
              <LogOut className="h-5 w-5" />
            </span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;