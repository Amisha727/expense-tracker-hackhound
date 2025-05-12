import React, { useState } from 'react';
import { Expense } from '../../types';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleEditSuccess = () => {
    setEditingExpense(null);
  };

  // Filter and sort expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortBy) {
      case 'amount-asc':
        return a.amount - b.amount;
      case 'amount-desc':
        return b.amount - a.amount;
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <div>
      {editingExpense ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm 
              existingExpense={editingExpense} 
              onSuccess={handleEditSuccess} 
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Input
                fullWidth
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5 text-slate-400" />}
              />
            </div>
            <div>
              <Select
                fullWidth
                options={[
                  { value: 'all', label: 'All Categories' },
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
                value={selectedCategory}
                onChange={setSelectedCategory}
                leftIcon={<Filter className="h-5 w-5 text-slate-400" />}
              />
            </div>
            <div>
              <Select
                fullWidth
                options={[
                  { value: 'date-desc', label: 'Newest First' },
                  { value: 'date-asc', label: 'Oldest First' },
                  { value: 'amount-desc', label: 'Highest Amount' },
                  { value: 'amount-asc', label: 'Lowest Amount' },
                ]}
                value={sortBy}
                onChange={setSortBy}
              />
            </div>
          </div>

          {sortedExpenses.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-500 dark:text-slate-400">No expenses found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedExpenses.map(expense => (
                <ExpenseItem 
                  key={expense.id} 
                  expense={expense} 
                  onEdit={handleEdit} 
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseList;