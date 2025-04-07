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
                },
                {
                    id: crypto.randomUUID(),
                    name: "AMD",
                    cost: 50,
                    amount: 3,
                    ticker: "AMD",
                },
            ] as investmentItem[],
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
