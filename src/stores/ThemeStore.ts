import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeStore } from "../components/types/interfaces";
const useThemeStore = create(
    persist<ThemeStore>(
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
