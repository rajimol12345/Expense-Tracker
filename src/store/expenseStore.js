// src/store/expenseStore.js
import { create } from "zustand";

export const useExpenseStore = create((set) => ({
  expenses: [],
  loading: false,

  // Set all expenses
  setExpenses: (expenses) => set({ expenses }),

  // Add a new expense to the top of the list
  addExpenseLocal: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),

  // Update an existing expense by ID
  updateExpenseLocal: (id, data) =>
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    })),

  // Remove an expense by ID
  removeExpenseLocal: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),

  // Set loading state
  setLoading: (loading) => set({ loading }),
}));
