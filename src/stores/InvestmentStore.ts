import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
import { investmentItem } from "../components/types/interfaces";
const useInvestmentStore = create(
    persist(
        (set, get) => ({
            investments: [] as investmentItem[],
            getHoldings: () => {
                const holdingsObj = get().investments.reduce(
                    (acc, investment) => {
                        if (acc[investment.ticker]) {
                            acc[investment.ticker].value +=
                                investment.cost * investment.amount;
                            acc[investment.ticker].amount += investment.amount;
                            acc[investment.ticker].avgCost =
                                acc[investment.ticker].value /
                                acc[investment.ticker].amount;
                            acc[investment.ticker].name = investment.name;
                            console.log("exist");
                        } else {
                            console.log("not exist", investment.ticker);
                            acc[investment.ticker] = {
                                value: investment.cost * investment.amount,
                                amount: investment.amount,
                                avgCost: investment.cost,
                                name: investment.name,
                            };
                        }
                        return acc;
                    },
                    {}
                );
                return Object.keys(holdingsObj).map((ticker) => ({
                    ticker,
                    value: holdingsObj[ticker].value,
                    amount: holdingsObj[ticker].amount,
                    avgCost: holdingsObj[ticker].avgCost,
                }));
            },
            getTotalCost: () => {
                return get().investments.reduce((acc, investment) => {
                    return acc + investment.cost * investment.amount;
                }, 0);
            },
            addInvestments: (investment: investmentItem[]) =>
                set((state) => ({
                    investments: [...investment, ...state.investments],
                })),
            deleteInvestments: (investmentArray: string[]) =>
                set((state) => ({
                    investments: state.investments.filter((investment) => {
                        return !investmentArray.includes(investment.id);
                    }),
                })),
        }),
        {
            name: "investment-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useInvestmentStore;
