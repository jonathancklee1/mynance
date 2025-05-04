import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
const useThemeStore = create(
    persist(
        (set) => ({
            theme: "theme1",
            setTheme: (theme: string) => set({ theme }),
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useThemeStore;
