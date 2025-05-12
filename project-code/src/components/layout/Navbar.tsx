import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-teal-600 dark:text-teal-500 text-xl font-bold">Kharchawise</span>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-900"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user && (
              <div className="ml-4 hidden md:flex items-center">
                <span className="text-sm text-slate-700 dark:text-slate-300 mr-2">
                  Hi, {user.name}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}

            <div className="ml-4 md:hidden">
              <button
                onClick={onMenuToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-900"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;