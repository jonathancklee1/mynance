import { create } from "zustand";
import {
    recurringExpenseItem,
    expenseItem,
    ExpenseStore,
    AssetDataItem,
} from "../types/interfaces";
import { persist, createJSONStorage } from "zustand/middleware";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { auth, db } from "../assets/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const myCollectionRef = collection(db, "users");

const useExpenseStore = create(
    persist<ExpenseStore>(
        (set, get) => ({
            capital: 0,
            assets: [],
            expenses: [] as expenseItem[],
            recurringExpenses: [] as recurringExpenseItem[],
            setCapital: (capital: number) => set({ capital }),
            setAssets: (assets: AssetDataItem[]) => set({ assets }),
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

                get().expenses?.forEach((expense: expenseItem) => {
                    const expenseDay = new Date(
                        new Date(expense.date).toDateString()
                    );
                    if (isDateInCurrentWeek(expenseDay)) {
                        weekExpenses.push(expense);
                    }
                });

                const firstDayString = new Date(firstDayOfWeek).toDateString();
                const lastDayString = new Date(lastDayOfWeek).toDateString();
                return { weekExpenses, firstDayString, lastDayString };
            },
            resetExpenseStore: () =>
                set({
                    expenses: [],
                    recurringExpenses: [],
                    capital: 0,
                    assets: [],
                }),
        }),
        {
            name: "expense-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
useExpenseStore.subscribe((state) => {
    const currentAuth = getAuth();
    const userId = currentAuth.currentUser?.uid;

    const storedState = {
        expenses: [...state.expenses],
        recurringExpenses: [...state.recurringExpenses],
        capital: state.capital,
        assets: state.assets,
    };
    if (userId) {
        setDoc(doc(db, "users", userId), storedState, {
            merge: true,
        });
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        getDocs(myCollectionRef)
            .then((querySnapshot) => {
                const currentAuth = getAuth();
                const userId = currentAuth.currentUser?.uid;
                querySnapshot.forEach((doc) => {
                    if (doc.id === userId) {
                        useExpenseStore.getState().expenses =
                            doc.data().expenses;
                        useExpenseStore.getState().recurringExpenses =
                            doc.data().recurringExpenses;
                        useExpenseStore.getState().capital = doc.data().capital;
                        useExpenseStore.getState().assets = doc.data().assets;
                    }
                });
                getDoc(doc(myCollectionRef, userId)).then((docSnapshot) => {
                    const userData = docSnapshot.data();
                    if (!userData) {
                        setDoc(
                            doc(myCollectionRef, userId),
                            {
                                expenses: [],
                                recurringExpenses: [],
                                capital: 0,
                                assets: [],
                            },
                            {
                                merge: true,
                            }
                        );
                    }
                });
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    }
});
export default useExpenseStore;
