import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
import {
    HoldingsItem,
    investmentItem,
    InvestmentStore,
} from "../types/interfaces";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, getDocs, collection, getDoc } from "firebase/firestore";
import { auth, db } from "../assets/firebase";

const myCollectionRef = collection(db, "users");

const useInvestmentStore = create(
    persist<InvestmentStore>(
        (set, get) => ({
            investments: [] as investmentItem[],
            getHoldings: () => {
                const holdingsObj =
                    get().investments?.reduce(
                        (
                            acc: { [key: string]: HoldingsItem },
                            investment: investmentItem
                        ) => {
                            if (acc[investment.ticker]) {
                                acc[investment.ticker].value +=
                                    investment.cost * investment.amount;
                                acc[investment.ticker].amount +=
                                    investment.amount;
                                acc[investment.ticker].avgCost =
                                    acc[investment.ticker].value /
                                    acc[investment.ticker].amount;
                                acc[investment.ticker].ticker = investment.name;
                            } else {
                                acc[investment.ticker] = {
                                    value: investment.cost * investment.amount,
                                    amount: investment.amount,
                                    avgCost: investment.cost,
                                    ticker: investment.name,
                                };
                            }
                            return acc;
                        },
                        {}
                    ) ?? {};
                return Object.keys(holdingsObj).map((ticker) => ({
                    ticker,
                    value: holdingsObj[ticker].value,
                    amount: holdingsObj[ticker].amount,
                    avgCost: holdingsObj[ticker].avgCost,
                }));
            },

            stocksCurrentValueObj: {} as { [key: string]: number },

            setStocksCurrentValueObj: (stockValue: { [key: string]: number }) =>
                set((state) => ({
                    stocksCurrentValueObj: {
                        ...state.stocksCurrentValueObj,
                        ...stockValue,
                    },
                })),
            getTotalCost: () => {
                return (
                    get().investments?.reduce((acc, investment) => {
                        return acc + investment.cost * investment.amount;
                    }, 0) ?? 0
                );
            },

            addInvestments: (investment: investmentItem[]) =>
                set((state) => ({
                    investments: [...investment, ...(state.investments || [])],
                })),
            deleteInvestments: (investmentArray: string[]) =>
                set((state) => ({
                    investments: state.investments?.filter((investment) => {
                        return !investmentArray.includes(investment.id);
                    }),
                })),
            resetInvestmentStore: () =>
                set(() => ({
                    investments: [],
                    stocksCurrentValueObj: {},
                })),
        }),
        {
            name: "investment-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

useInvestmentStore.subscribe((state) => {
    const currentAuth = getAuth();
    const userId = currentAuth.currentUser?.uid;

    const storedState = {
        investments: [...state.investments],
        stocksCurrentValueObj: state.stocksCurrentValueObj,
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
                        useInvestmentStore.getState().investments =
                            doc.data().investments;
                        useInvestmentStore.getState().stocksCurrentValueObj =
                            doc.data().stocksCurrentValueObj;
                    }
                });
                getDoc(doc(myCollectionRef, userId)).then((docSnapshot) => {
                    const userData = docSnapshot.data();
                    if (!userData) {
                        setDoc(
                            doc(myCollectionRef, userId),
                            {
                                investments: [],
                                stocksCurrentValueObj: {},
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
export default useInvestmentStore;
