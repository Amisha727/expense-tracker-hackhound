import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseSummary from '../components/dashboard/ExpenseSummary';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import Chart from '../components/dashboard/Chart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ExpenseCategory } from '../types';

const categoryColors = [
  '#F59E0B', // amber-500
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#EF4444', // red-500
  '#6366F1', // indigo-500
  '#14B8A6', // teal-500
  '#0EA5E9', // sky-500
  '#64748B', // slate-500
];

const Dashboard = () => {
  const { expenses, budgets, getMonthlyExpenses } = useExpenses();
  
  const monthlyExpenses = getMonthlyExpenses();
  
  // Prepare data for category distribution chart
  const prepareCategoryData = () => {
    const categoryTotals: Record<string, number> = {};
    
    monthlyExpenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    
    const sortedCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1]);
    
    return {
      labels: sortedCategories.map(([category]) => getCategoryLabel(category)),
      datasets: [
        {
          label: 'Spending by Category',
          data: sortedCategories.map(([_, amount]) => amount),
          backgroundColor: sortedCategories.map((_, i) => categoryColors[i % categoryColors.length]),
        },
      ],
    };
  };
  
  // Prepare data for daily spending chart
  const prepareDailyData = () => {
    const dailyTotals: Record<string, number> = {};
    
    // Get last 7 days
    const today = new Date();
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dates.push(dateStr);
      dailyTotals[dateStr] = 0;
    }
    
    // Sum expenses by day
    monthlyExpenses.forEach(expense => {
      const dateStr = new Date(expense.date).toISOString().split('T')[0];
      if (dailyTotals[dateStr] !== undefined) {
        dailyTotals[dateStr] += expense.amount;
      }
    });
    
    // Format labels for display
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { weekday: 'short' });
    };
    
    return {
      labels: dates.map(formatDate),
      datasets: [
        {
          label: 'Daily Spending',
          data: dates.map(date => dailyTotals[date]),
          backgroundColor: '#10B981',
          borderColor: '#059669',
          borderWidth: 2,
        },
      ],
    };
  };
  
  const getCategoryLabel = (category: string): string => {
    const mapping: Record<string, string> = {
      food: 'Food & Dining',
      transport: 'Transportation',
      utilities: 'Utilities',
      entertainment: 'Entertainment',
      housing: 'Housing & Rent',
      healthcare: 'Healthcare',
      education: 'Education',
      shopping: 'Shopping',
      travel: 'Travel',
      other: 'Other',
    };
    return mapping[category] || category;
  };
  
  const categoryData = prepareCategoryData();
  const dailyData = prepareDailyData();
  
  // Get budgets with categories
  const activeBudgets = budgets.filter(budget => {
    // Show budgets that are active for the current period
    const now = new Date();
    return (!budget.endDate || new Date(budget.endDate) >= now);
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExpenseSummary expenses={monthlyExpenses} timeframe="Monthly" />
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(expenses.reduce((sum, e) => sum + e.amount, 0))}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">This Month</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(monthlyExpenses.reduce((sum, e) => sum + e.amount, 0))}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Budgets</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{activeBudgets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Budget Progress */}
      {activeBudgets.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Budget Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBudgets.map(budget => (
              <BudgetProgress 
                key={budget.id} 
                category={budget.category} 
                budget={budget} 
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart 
          data={categoryData} 
          type="pie" 
          title="Spending by Category" 
        />
        <Chart 
          data={dailyData} 
          type="bar" 
          title="Daily Spending (Last 7 Days)" 
        />
      </div>
    </div>
  );
};

export default Dashboard;