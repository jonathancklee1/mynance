import { create } from "zustand";
import {
    recurringExpenseItem,
    expenseItem,
} from "../components/types/interfaces";
import { persist, createJSONStorage } from "zustand/middleware";
const useExpenseStore = create(
    persist(
        (set, get) => ({
            expenses: [] as expenseItem[],
            recurringExpenses: [] as recurringExpenseItem[],
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
                    recurringExpenses: state.recurringExpenses.filter(
                        (expense) => {
                            return expense !== expenseItem;
                        }
                    ),
                })),
            getTotalExpenses: () => {
                let totalExpenses = 0;
                get().expenses.forEach((expense) => {
                    totalExpenses += parseInt(expense.cost);
                });
                get().recurringExpenses.forEach((expense) => {
                    totalExpenses += parseInt(expense.cost);
                });
                return totalExpenses;
            },
        }),
        {
            name: "expense-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useExpenseStore;
