import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
import { investmentItem } from "../components/types/interfaces";
const useInvestmentStore = create(
    persist(
        (set, get) => ({
            investments: [
                {
                    id: crypto.randomUUID(),
                    name: "Nvidia",
                    cost: 50,
                    amount: 3,
                    ticker: "NVDA",
                    date: new Date().toDateString(),
                },
                {
                    id: crypto.randomUUID(),
                    name: "AMD",
                    cost: 50,
                    amount: 3,
                    ticker: "AMD",
                    date: new Date().toDateString(),
                },
            ] as investmentItem[],
            getHoldings: () => {
                const holdingsObj = get().investments.reduce(
                    (acc, investment) => {
                        console.log(investment);
                        console.log(acc[investment.ticker]);
                        if (acc[investment.ticker]) {
                            acc[investment.ticker] +=
                                investment.cost * investment.amount;
                            console.log("exist");
                        } else {
                            console.log("not exist", investment.ticker);
                            acc[investment.ticker] =
                                investment.cost * investment.amount;
                        }
                        return acc;
                    },
                    {}
                );
                return Object.keys(holdingsObj).map((ticker) => ({
                    ticker,
                    value: holdingsObj[ticker],
                }));
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
