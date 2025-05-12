import React from 'react';
import { ExpenseCategory, Budget } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useExpenses } from '../../context/ExpenseContext';

interface BudgetProgressProps {
  category: ExpenseCategory;
  budget: Budget;
}

const categoryColors: Record<string, { bg: string; text: string, bar: string }> = {
  food: { 
    bg: 'bg-amber-100 dark:bg-amber-900/30', 
    text: 'text-amber-800 dark:text-amber-300', 
    bar: 'bg-amber-500' 
  },
  transport: { 
    bg: 'bg-blue-100 dark:bg-blue-900/30', 
    text: 'text-blue-800 dark:text-blue-300', 
    bar: 'bg-blue-500' 
  },
  utilities: { 
    bg: 'bg-teal-100 dark:bg-teal-900/30', 
    text: 'text-teal-800 dark:text-teal-300', 
    bar: 'bg-teal-500' 
  },
  entertainment: { 
    bg: 'bg-purple-100 dark:bg-purple-900/30', 
    text: 'text-purple-800 dark:text-purple-300', 
    bar: 'bg-purple-500' 
  },
  housing: { 
    bg: 'bg-green-100 dark:bg-green-900/30', 
    text: 'text-green-800 dark:text-green-300', 
    bar: 'bg-green-500' 
  },
  healthcare: { 
    bg: 'bg-rose-100 dark:bg-rose-900/30', 
    text: 'text-rose-800 dark:text-rose-300', 
    bar: 'bg-rose-500' 
  },
  education: { 
    bg: 'bg-indigo-100 dark:bg-indigo-900/30', 
    text: 'text-indigo-800 dark:text-indigo-300', 
    bar: 'bg-indigo-500' 
  },
  shopping: { 
    bg: 'bg-pink-100 dark:bg-pink-900/30', 
    text: 'text-pink-800 dark:text-pink-300', 
    bar: 'bg-pink-500' 
  },
  travel: { 
    bg: 'bg-cyan-100 dark:bg-cyan-900/30', 
    text: 'text-cyan-800 dark:text-cyan-300', 
    bar: 'bg-cyan-500' 
  },
  other: { 
    bg: 'bg-slate-100 dark:bg-slate-900/30', 
    text: 'text-slate-800 dark:text-slate-300', 
    bar: 'bg-slate-500' 
  },
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

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const BudgetProgress: React.FC<BudgetProgressProps> = ({ category, budget }) => {
  const { getTotalExpensesByCategory } = useExpenses();
  
  const spent = getTotalExpensesByCategory(category);
  const budgetAmount = budget.amount;
  const remaining = Math.max(budgetAmount - spent, 0);
  const progress = Math.min((spent / budgetAmount) * 100, 100);
  
  const colorClass = categoryColors[category] || categoryColors.other;
  const isOverBudget = spent > budgetAmount;

  return (
    <Card className={`${colorClass.bg} border-none shadow-sm`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-md ${colorClass.text}`}>
          {getCategoryLabel(category)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={colorClass.text}>
              Spent: {formatCurrency(spent)}
            </span>
            <span className={colorClass.text}>
              Budget: {formatCurrency(budgetAmount)}
            </span>
          </div>
          
          <div className="h-2 w-full bg-white/50 dark:bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isOverBudget ? 'bg-red-500' : colorClass.bar} transition-all duration-500 ease-in-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-sm font-medium">
            {isOverBudget ? (
              <span className="text-red-600 dark:text-red-400">
                Over budget by {formatCurrency(spent - budgetAmount)}
              </span>
            ) : (
              <span className={colorClass.text}>
                {formatCurrency(remaining)} remaining
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;