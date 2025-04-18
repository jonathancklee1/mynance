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

            getWeekExpenses: () => {
                const weekExpenses = [] as expenseItem[];
                const today = new Date();
                const firstDayOfWeek = new Date(
                    today.setDate(today.getDate() - today.getDay())
                ).setHours(0, 0, 0, 0);
                const lastDayOfWeek = new Date(
                    today.setDate(today.getDate() + 6)
                ).setHours(0, 0, 0, 0);
                function isDateInCurrentWeek(date) {
                    return date >= firstDayOfWeek && date <= lastDayOfWeek;
                }

                get().expenses.forEach((expense: expenseItem) => {
                    const expenseDay = new Date(expense.date);
                    if (isDateInCurrentWeek(expenseDay)) {
                        weekExpenses.push(expense);
                    }
                });

                const firstDayString = new Date(firstDayOfWeek).toDateString();
                const lastDayString = new Date(lastDayOfWeek).toDateString();
                return { weekExpenses, firstDayString, lastDayString };
            },
        }),
        {
            name: "expense-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useExpenseStore;
