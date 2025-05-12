import React from 'react';
import { Expense } from '../../types';
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { useExpenses } from '../../context/ExpenseContext';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
}

const categoryColors: Record<string, string> = {
  food: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  transport: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  utilities: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  housing: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  healthcare: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  education: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  travel: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  other: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300',
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

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit }) => {
  const { deleteExpense } = useExpenses();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(expense.id);
    }
  };

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${categoryColors[expense.category]}`}>
                {getCategoryLabel(expense.category)}
              </span>
              {expense.isRecurring && (
                <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  Recurring ({expense.recurringInterval})
                </span>
              )}
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white">
              {formatCurrency(expense.amount)}
            </span>
          </div>
          
          <div className="mt-2">
            <h3 className="text-md font-medium text-slate-900 dark:text-white">
              {expense.description}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {formatDate(expense.date)}
            </p>
          </div>
        </div>
        
        <div className="flex border-t border-slate-200 dark:border-slate-700 divide-x divide-slate-200 dark:divide-slate-700">
          <button
            onClick={() => onEdit(expense)}
            className="flex-1 flex items-center justify-center py-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseItem;