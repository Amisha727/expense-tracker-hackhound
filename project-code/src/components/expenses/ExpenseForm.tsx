import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { useExpenses } from '../../context/ExpenseContext';
import { Calendar, DollarSign, FileText, Tag } from 'lucide-react';

interface ExpenseFormProps {
  onSuccess?: () => void;
  existingExpense?: Expense;
}

const CATEGORY_OPTIONS = [
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
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  onSuccess,
  existingExpense 
}) => {
  const [amount, setAmount] = useState(existingExpense?.amount.toString() || '');
  const [description, setDescription] = useState(existingExpense?.description || '');
  const [category, setCategory] = useState<ExpenseCategory>(existingExpense?.category || 'food');
  const [date, setDate] = useState(
    existingExpense?.date 
      ? new Date(existingExpense.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [isRecurring, setIsRecurring] = useState(existingExpense?.isRecurring || false);
  const [recurringInterval, setRecurringInterval] = useState(
    existingExpense?.recurringInterval || 'monthly'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { addExpense, updateExpense } = useExpenses();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate form
      if (!amount || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid amount greater than 0');
      }

      if (!description.trim()) {
        throw new Error('Please enter a description');
      }

      const expenseData = {
        amount: parseFloat(amount),
        description,
        category,
        date: new Date(date),
        isRecurring,
        ...(isRecurring && { recurringInterval: recurringInterval as 'daily' | 'weekly' | 'monthly' | 'yearly' }),
      };

      if (existingExpense) {
        updateExpense(existingExpense.id, expenseData);
      } else {
        addExpense(expenseData);
      }

      // Reset form if not editing
      if (!existingExpense) {
        setAmount('');
        setDescription('');
        setCategory('food');
        setDate(new Date().toISOString().split('T')[0]);
        setIsRecurring(false);
        setRecurringInterval('monthly');
      }

      // Callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
            fullWidth
            leftIcon={<DollarSign className="h-5 w-5" />}
          />
        </div>
        <div className="flex-1">
          <Input
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            fullWidth
            leftIcon={<Calendar className="h-5 w-5" />}
          />
        </div>
      </div>

      <Input
        id="description"
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter expense description"
        required
        fullWidth
        leftIcon={<FileText className="h-5 w-5" />}
      />

      <Select
        id="category"
        label="Category"
        value={category}
        onChange={(value) => setCategory(value as ExpenseCategory)}
        options={CATEGORY_OPTIONS}
        required
        fullWidth
      />

      <div className="flex items-center mb-4">
        <input
          id="isRecurring"
          type="checkbox"
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
        />
        <label htmlFor="isRecurring" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
          This is a recurring expense
        </label>
      </div>

      {isRecurring && (
        <Select
          id="recurringInterval"
          label="Recurring Interval"
          value={recurringInterval}
          onChange={setRecurringInterval}
          options={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
          required
          fullWidth
        />
      )}

      <div className="flex justify-end">
        <Button 
          type="submit" 
          isLoading={isSubmitting}
        >
          {existingExpense ? 'Update Expense' : 'Add Expense'}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;