import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import MobileMenu from './components/layout/MobileMenu';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import Budgets from './pages/Budgets';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Categories from './pages/Categories';
import History from './pages/History';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <Expenses />;
      case 'add-expense':
        return <AddExpense />;
      case 'categories':
        return <Categories />;
      case 'budgets':
        return <Budgets />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <Navbar 
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block">
          <Sidebar activePage={activePage} onChangePage={setActivePage} />
        </div>
        
        <MobileMenu
          isOpen={isMobileMenuOpen}
          activePage={activePage}
          onChangePage={setActivePage}
          onMenuToggle={handleMenuToggle}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExpenseProvider>
          <AppContent />
        </ExpenseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;