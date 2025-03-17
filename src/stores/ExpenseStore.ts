import { create } from "zustand";
import {
    recurringExpenseItem,
    expenseItem,
} from "../components/types/interfaces";
const useExpenseStore = create((set) => ({
    expenses: [
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Transport",
            cost: "222",
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Present",
            cost: "22",
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Meals",
            cost: "22",
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Clothes",
            cost: "22",
        },
    ] as expenseItem[],
    recurringExpenses: [
        { id: crypto.randomUUID(), name: "Groceries", cost: 50 },
        { id: crypto.randomUUID(), name: "Utilities", cost: 100 },
        { id: crypto.randomUUID(), name: "Entertainment", cost: 75 },
    ] as recurringExpenseItem[],
    setExpenses: (expenses: expenseItem[]) => set({ expenses }),
    addExpenses: (expense: expenseItem[]) =>
        set((state) => {
            // console.log([...state.expenses, [...expense]]);
            return { expenses: [...expense, ...state.expenses] };
        }),
    deleteExpenses: (expenseArray: string[]) =>
        set((state) => ({
            expenses: state.expenses.filter((expense) => {
                return !expenseArray.includes(expense.id);
            }),
        })),

    setRecurringExpenses: (recurringExpenses: recurringExpenseItem[]) =>
        set({ recurringExpenses }),
    addRecurringExpense: (expense: expenseItem) =>
        set((state) => ({
            recurringExpenses: [...state.recurringExpenses, expense],
        })),
    deleteRecurringExpense: (expenseItem: expenseItem) =>
        set((state) => ({
            recurringExpenses: state.recurringExpenses.filter((expense) => {
                return expense !== expenseItem;
            }),
        })),
}));

export default useExpenseStore;
