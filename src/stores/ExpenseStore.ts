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
    recurringExpenses: [] as recurringExpenseItem[],
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
    deleteRecurringExpenses: (expenseArray: expenseItem[]) =>
        set((state) => ({
            recurringExpenses: state.recurringExpenses.filter((expense) => {
                return !expenseArray.includes(expense);
            }),
        })),
}));

export default useExpenseStore;
