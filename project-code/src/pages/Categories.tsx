import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card, CardContent } from '../components/ui/Card';
import { ExpenseCategory } from '../types';

const Categories = () => {
  const { expenses, getTotalExpensesByCategory } = useExpenses();

  const categories: ExpenseCategory[] = [
    'food',
    'transport',
    'utilities',
    'entertainment',
    'housing',
    'healthcare',
    'education',
    'shopping',
    'travel',
    'other'
  ];

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

  const getCategoryIcon = (category: string): string => {
    const mapping: Record<string, string> = {
      food: '🍔',
      transport: '🚗',
      utilities: '💡',
      entertainment: '🎬',
      housing: '🏠',
      healthcare: '⚕️',
      education: '📚',
      shopping: '🛍️',
      travel: '✈️',
      other: '📦',
    };
    return mapping[category] || '📦';
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Sort categories by total amount
  const sortedCategories = [...categories].sort((a, b) => {
    const aTotal = getTotalExpensesByCategory(a);
    const bTotal = getTotalExpensesByCategory(b);
    return bTotal - aTotal;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCategories.map(category => {
          const total = getTotalExpensesByCategory(category);
          const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
          
          // Apply dynamic color based on category
          const categoryColors: Record<string, { bg: string, text: string, bar: string }> = {
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
          
          const colorClass = categoryColors[category] || categoryColors.other;
          
          return (
            <Card key={category} className={`${colorClass.bg} border-none`}>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{getCategoryIcon(category)}</span>
                  <h3 className={`text-lg font-medium ${colorClass.text}`}>
                    {getCategoryLabel(category)}
                  </h3>
                </div>
                
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-sm ${colorClass.text}`}>{formatCurrency(total)}</span>
                  <span className={`text-sm ${colorClass.text}`}>{percentage.toFixed(1)}%</span>
                </div>
                
                <div className="h-2 w-full bg-white/50 dark:bg-slate-700/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${colorClass.bar} transition-all duration-500 ease-in-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="mt-2">
                  <span className={`text-sm ${colorClass.text}`}>
                    {expenses.filter(e => e.category === category).length} expenses
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;