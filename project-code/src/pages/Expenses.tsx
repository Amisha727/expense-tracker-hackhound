import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseList from '../components/expenses/ExpenseList';

const Expenses = () => {
  const { expenses } = useExpenses();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Expenses</h1>
      
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Expenses;