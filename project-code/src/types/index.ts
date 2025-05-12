export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
  isRecurring: boolean;
  recurringInterval?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'utilities'
  | 'entertainment'
  | 'housing'
  | 'healthcare'
  | 'education'
  | 'shopping'
  | 'travel'
  | 'other';

export interface Budget {
  id: string;
  userId: string;
  category: ExpenseCategory;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate?: Date;
}

export interface Settings {
  currency: string;
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  budgetAlerts: boolean;
  language: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}