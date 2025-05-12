import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import { Search, SlidersHorizontal, Calendar } from 'lucide-react';
import ExpenseItem from '../components/expenses/ExpenseItem';
import { Expense } from '../types';
import ExpenseForm from '../components/expenses/ExpenseForm';

const History = () => {
  const { expenses } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const generateMonthOptions = () => {
    const options = [{ value: 'all', label: 'All Time' }];
    const months: Record<string, boolean> = {};
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!months[monthYear]) {
        months[monthYear] = true;
        options.push({
          value: monthYear,
          label: date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
        });
      }
    });
    
    return options;
  };

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
    
    const matchesMonth = selectedMonth === 'all' || (() => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      return monthYear === selectedMonth;
    })();
    
    return matchesSearch && matchesCategory && matchesMonth;
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

  const totalFilteredAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Expense History</h1>
        <button
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <SlidersHorizontal className="h-4 w-4 mr-1" />
          Filters
        </button>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <div className="flex-1">
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="h-5 w-5 text-slate-400" />}
                  fullWidth
                />
              </div>
            </div>
            
            {isFiltersExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
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
                  fullWidth
                />
                
                <Select
                  options={generateMonthOptions()}
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  leftIcon={<Calendar className="h-5 w-5 text-slate-400" />}
                  fullWidth
                />
                
                <Select
                  options={[
                    { value: 'date-desc', label: 'Newest First' },
                    { value: 'date-asc', label: 'Oldest First' },
                    { value: 'amount-desc', label: 'Highest Amount' },
                    { value: 'amount-asc', label: 'Lowest Amount' },
                  ]}
                  value={sortBy}
                  onChange={setSortBy}
                  fullWidth
                />
              </div>
            )}
            
            <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {filteredExpenses.length} expenses found
              </span>
              <span className="text-sm font-medium">
                Total: {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(totalFilteredAmount)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
        <div className="space-y-4">
          {sortedExpenses.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-slate-500 dark:text-slate-400">No expenses found matching your criteria.</p>
            </div>
          ) : (
            sortedExpenses.map(expense => (
              <ExpenseItem 
                key={expense.id} 
                expense={expense} 
                onEdit={handleEdit} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default History;