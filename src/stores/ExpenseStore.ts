import { create } from "zustand";
import {
    recurringExpenseItem,
    expenseItem,
    ExpenseStore,
} from "../types/interfaces";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { db } from "../assets/firebase";

import { getAuth } from "firebase/auth";

const myCollectionRef = collection(db, "users");

const useExpenseStore = create<ExpenseStore>((set, get) => ({
    expenses: [] as expenseItem[],
    recurringExpenses: [] as recurringExpenseItem[],
    addExpenses: (expense: expenseItem[]) =>
        set((state) => {
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
    addRecurringExpense: (expense: recurringExpenseItem) =>
        set((state) => ({
            recurringExpenses: [...state.recurringExpenses, expense],
        })),
    deleteRecurringExpense: (expenseItem: recurringExpenseItem) =>
        set((state) => ({
            recurringExpenses: state.recurringExpenses.filter((expense) => {
                return expense !== expenseItem;
            }),
        })),
    getTotalExpenses: () => {
        let totalExpenses = 0;
        get().expenses.forEach((expense) => {
            totalExpenses += parseInt(expense.cost);
        });
        get().recurringExpenses.forEach((expense) => {
            totalExpenses += expense.cost;
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
        function isDateInCurrentWeek(date: Date) {
            return (
                date.setHours(0, 0, 0, 0) >= firstDayOfWeek &&
                date.setHours(0, 0, 0, 0) <= lastDayOfWeek
            );
        }

        get().expenses.forEach((expense: expenseItem) => {
            const expenseDay = new Date(new Date(expense.date).toDateString());
            if (isDateInCurrentWeek(expenseDay)) {
                weekExpenses.push(expense);
            }
        });

        const firstDayString = new Date(firstDayOfWeek).toDateString();
        const lastDayString = new Date(lastDayOfWeek).toDateString();
        return { weekExpenses, firstDayString, lastDayString };
    },
}));
useExpenseStore.subscribe((state) => {
    const currentAuth = getAuth();
    const userId = currentAuth.currentUser?.uid;

    console.log(state);
    const storedState = {
        expenses: [...state.expenses],
        recurringExpenses: [...state.recurringExpenses],
    };
    console.log(storedState, userId);
    if (userId) {
        setDoc(doc(db, "users", userId), storedState);
    }
});

getDocs(myCollectionRef).then((querySnapshot) => {
    const currentAuth = getAuth();
    const userId = currentAuth.currentUser?.uid;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, userId);
        if (doc.id === userId) {
            useExpenseStore.getState().expenses = doc.data().expenses;
            useExpenseStore.getState().recurringExpenses =
                doc.data().recurringExpenses;
            console.log("Firestore set to state");
        }
    });
});

export default useExpenseStore;
