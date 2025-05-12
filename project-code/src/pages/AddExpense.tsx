import React from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const AddExpense = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add Expense</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpense;