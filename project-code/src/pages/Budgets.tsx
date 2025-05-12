import React, { useState } from 'react';
import { Budget, ExpenseCategory } from '../types';
import { useExpenses } from '../context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import { Trash2 } from 'lucide-react';

const Budgets = () => {
  const { budgets, addBudget, deleteBudget } = useExpenses();
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage('Please enter a valid amount greater than 0');
      return;
    }

    // Check if budget for this category already exists
    const existingBudget = budgets.find(budget => budget.category === category);
    if (existingBudget) {
      setErrorMessage(`A budget for ${getCategoryLabel(category)} already exists`);
      return;
    }

    const newBudget: Omit<Budget, 'id' | 'userId'> = {
      category,
      amount: parseFloat(amount),
      period,
      startDate: new Date(),
    };

    addBudget(newBudget);
    
    // Reset form
    setAmount('');
    setCategory('food');
    setPeriod('monthly');
    setIsAddingBudget(false);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Budgets</h1>
        
        {!isAddingBudget && (
          <Button 
            onClick={() => setIsAddingBudget(true)}
            className="mt-2 sm:mt-0"
          >
            Add Budget
          </Button>
        )}
      </div>
      
      {isAddingBudget && (
        <Card>
          <form onSubmit={handleAddBudget}>
            <CardHeader>
              <CardTitle>Create New Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md">
                  {errorMessage}
                </div>
              )}
              
              <Select
                label="Category"
                options={[
                  { value: 'food', label: 'Food & Dining' },
                  { value: 'transport', label: 'Transportation' },
                  { value: 'utilities', label: 'Utilities' },
                  { value: 'entertainment', label: 'Entertainment' },
                  { value: 'housing', label: 'Housing & Rent' },
                  { value: 'healthcare', label: 'Healthcare' },
                  { value: 'education', label: 'Education' },
                  { value: 'shopping', label: 'Shopping' },
                  { value: 'travel', label: 'Travel' },
                  { value: 'other', label: 'Other' },
                ]}
                value={category}
                onChange={(value) => setCategory(value as ExpenseCategory)}
                fullWidth
              />
              
              <Input
                label="Budget Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
                fullWidth
              />
              
              <Select
                label="Budget Period"
                options={[
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Yearly' },
                ]}
                value={period}
                onChange={(value) => setPeriod(value as 'weekly' | 'monthly' | 'yearly')}
                fullWidth
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsAddingBudget(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Budget</Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      {budgets.length === 0 ? (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No budgets set up yet. Add your first budget to start tracking your spending.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map(budget => (
              <div key={budget.id} className="relative">
                <BudgetProgress category={budget.category} budget={budget} />
                <button
                  onClick={() => deleteBudget(budget.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;