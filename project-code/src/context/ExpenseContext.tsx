import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, ExpenseCategory, Budget } from '../types';
import { useAuth } from './AuthContext';

interface ExpenseContextType {
  expenses: Expense[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, 'id' | 'userId'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id' | 'userId'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getTotalExpensesByCategory: (category: ExpenseCategory) => number;
  getMonthlyExpenses: () => Expense[];
  getBudgetByCategory: (category: ExpenseCategory) => Budget | undefined;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    if (user) {
      const storedExpenses = localStorage.getItem(`expenses-${user.id}`);
      const storedBudgets = localStorage.getItem(`budgets-${user.id}`);
      
      if (storedExpenses) {
        const parsedExpenses = JSON.parse(storedExpenses);
        setExpenses(parsedExpenses.map((e: any) => ({
          ...e,
          date: new Date(e.date)
        })));
      }
      
      if (storedBudgets) {
        const parsedBudgets = JSON.parse(storedBudgets);
        setBudgets(parsedBudgets.map((b: any) => ({
          ...b,
          startDate: new Date(b.startDate),
          endDate: b.endDate ? new Date(b.endDate) : undefined
        })));
      }
    } else {
      // Clear state when user logs out
      setExpenses([]);
      setBudgets([]);
    }
  }, [user]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`expenses-${user.id}`, JSON.stringify(expenses));
    }
  }, [expenses, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`budgets-${user.id}`, JSON.stringify(budgets));
    }
  }, [budgets, user]);

  const addExpense = (expense: Omit<Expense, 'id' | 'userId'>) => {
    if (!user) return;
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      userId: user.id,
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const updateExpense = (id: string, expenseUpdate: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...expenseUpdate } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const addBudget = (budget: Omit<Budget, 'id' | 'userId'>) => {
    if (!user) return;
    const newBudget: Budget = {
      ...budget,
      id: crypto.randomUUID(),
      userId: user.id,
    };
    setBudgets(prev => [...prev, newBudget]);
  };

  const updateBudget = (id: string, budgetUpdate: Partial<Budget>) => {
    setBudgets(prev => 
      prev.map(budget => 
        budget.id === id ? { ...budget, ...budgetUpdate } : budget
      )
    );
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  };

  const getTotalExpensesByCategory = (category: ExpenseCategory) => {
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getMonthlyExpenses = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth;
    });
  };

  const getBudgetByCategory = (category: ExpenseCategory) => {
    return budgets.find(budget => budget.category === category);
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      budgets,
      addExpense,
      updateExpense,
      deleteExpense,
      addBudget,
      updateBudget,
      deleteBudget,
      getTotalExpensesByCategory,
      getMonthlyExpenses,
      getBudgetByCategory
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};