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
            expense: "Snow",
            cost: "222",
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Lannister",
            cost: "22",
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Lannister",
            cost: "22",
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Stark",
            cost: "22",
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toDateString(),
            expense: "Targaryen",
            cost: "1",
        },
    ] as expenseItem[],
    recurringExpenses: [
        { id: crypto.randomUUID(), name: "Groceries", amount: 50 },
        { id: crypto.randomUUID(), name: "Utilities", amount: 100 },
        { id: crypto.randomUUID(), name: "Entertainment", amount: 75 },
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
