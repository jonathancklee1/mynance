import { create } from "zustand";
import {
    recurringExpenseItem,
    expenseItem,
} from "../components/types/interfaces";
const useStore = create((set) => ({
    expenses: [] as expenseItem[],
    recurringExpenses: [] as recurringExpenseItem[],
    setExpenses: (expenses: expenseItem[]) => set({ expenses }),
    addExpenses: (expense: expenseItem[]) =>
        set((state) => ({ expenses: [...state.expenses, [...expense]] })),
    deleteExpenses: (expenseArray: expenseItem[]) =>
        set((state) => ({
            expenses: state.expenses.filter((expense) => {
                return !expenseArray.includes(expense);
            }),
        })),

    setRecurringExpenses: (recurringExpenses: recurringExpenseItem[]) =>
        set({ recurringExpenses }),
    addRecurringExpense: (expense: expenseItem) =>
        set((state) => ({
            recurringExpenses: [...state.recurringExpenses, expense],
        })),
    deleteRecurringExpenses: (expenseArray: expenseItem[]) =>
        set((state) => ({
            recurringExpenses: state.recurringExpenses.filter((expense) => {
                return !expenseArray.includes(expense);
            }),
        })),
}));

export default useStore;
