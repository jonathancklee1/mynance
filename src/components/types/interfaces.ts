export interface recurringExpenseItem {
    id: string;
    name: string;
    cost: number;
}

export interface expenseItem {
    id: string;
    date: string;
    expense: string;
    cost: string;
}

export interface PieChartData {
    id: string;
    label: string;
    value: number;
    color: string;
}

export interface investmentItem {
    id: string;
    name: string;
    cost: number;
    amount: number;
    ticker?: string;
    date: string;
}

export interface HoldingsItem {
    ticker: string;
    value: number;
    amount: number;
    avgCost: number;
}

export interface ThemeStore {
    theme: string;
    setTheme: (theme: string) => void;
}
