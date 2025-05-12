import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Moon, Sun, Bell, BellOff, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
      // Clear localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('expenses-') || key.startsWith('budgets-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Reload page
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Theme
              </label>
              <div className="flex space-x-2">
                <Button
                  onClick={theme === 'dark' ? toggleTheme : undefined}
                  variant={theme === 'light' ? 'primary' : 'outline'}
                  className="flex-1"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  onClick={theme === 'light' ? toggleTheme : undefined}
                  variant={theme === 'dark' ? 'primary' : 'outline'}
                  className="flex-1"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Currency"
              options={[
                { value: 'INR', label: 'INR - Indian Rupee' },
                { value: 'USD', label: 'USD - US Dollar' },
                { value: 'EUR', label: 'EUR - Euro' },
                { value: 'GBP', label: 'GBP - British Pound' },
                { value: 'JPY', label: 'JPY - Japanese Yen' },
              ]}
              value={currency}
              onChange={setCurrency}
              fullWidth
            />
            
            <Select
              label="Language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'hi', label: 'हिंदी' },
                { value: 'bn', label: 'বাংলা' },
                { value: 'te', label: 'తెలుగు' },
                { value: 'ta', label: 'தமிழ்' },
              ]}
              value={language}
              onChange={setLanguage}
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Notifications
              </label>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setNotifications(true)}
                  variant={notifications ? 'primary' : 'outline'}
                  className="flex-1"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Enabled
                </Button>
                <Button
                  onClick={() => setNotifications(false)}
                  variant={!notifications ? 'primary' : 'outline'}
                  className="flex-1"
                >
                  <BellOff className="h-4 w-4 mr-2" />
                  Disabled
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Data Management */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your account data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-md font-medium text-slate-900 dark:text-white mb-2">Clear All Data</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                This will delete all your expenses, budgets, and settings. This action cannot be undone.
              </p>
              <Button 
                variant="danger"
                onClick={handleClearData}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;