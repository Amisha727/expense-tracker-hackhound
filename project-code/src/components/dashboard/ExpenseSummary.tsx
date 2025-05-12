import React from 'react';
import { Expense } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface ExpenseSummaryProps {
  expenses: Expense[];
  timeframe: string;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses, timeframe }) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const getAverageDailyExpense = () => {
    if (expenses.length === 0) return 0;
    
    // Get unique dates
    const uniqueDates = new Set(
      expenses.map(expense => 
        new Date(expense.date).toISOString().split('T')[0]
      )
    );
    
    return totalAmount / uniqueDates.size;
  };

  // Get top spending category
  const getCategoryTotals = () => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    
    return categoryTotals;
  };

  const categoryTotals = getCategoryTotals();
  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0] || ['none', 0];

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
      none: 'None',
    };
    return mapping[category] || category;
  };

  const averageDaily = getAverageDailyExpense();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{timeframe} Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Expenses</h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalAmount)}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Daily Average</h3>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(averageDaily)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Top Category</h3>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {topCategory[0] !== 'none' ? getCategoryLabel(topCategory[0]) : 'None'}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Number of Transactions</h3>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{expenses.length}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;