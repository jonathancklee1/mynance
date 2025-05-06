export interface recurringExpenseItem {
    id: string;
    name: string;
    cost: string;
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
    ticker: string;
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

export interface ExpenseStore {
    expenses: expenseItem[];
    recurringExpenses: recurringExpenseItem[];
    addExpenses: (expense: expenseItem[]) => void;
    deleteExpenses: (expenseArray: string[]) => void;
    addRecurringExpense: (expense: recurringExpenseItem) => void;
    deleteRecurringExpense: (expenseItem: recurringExpenseItem) => void;
    getTotalExpenses: () => number;
    getWeekExpenses: () => { weekExpenses: expenseItem[] };
}

export interface InvestmentStore {
    investments: investmentItem[];
    addInvestments: (investment: investmentItem[]) => void;
    deleteInvestments: (investmentArray: string[]) => void;
    getHoldings: () => HoldingsItem[];
    getTotalCost: () => number;
}
