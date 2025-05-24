export interface recurringExpenseItem {
    id: string;
    name: string;
    cost: number;
}

export interface expenseItem {
    id: string;
    date: number;
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
    date: number;
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
    getWeekExpenses: () => weeklyExpensesObj;
    setRecurringExpenses: (recurringExpenses: recurringExpenseItem[]) => void;
}

export interface InvestmentStore {
    investments: investmentItem[];
    addInvestments: (investment: investmentItem[]) => void;
    deleteInvestments: (investmentArray: string[]) => void;
    getHoldings: () => HoldingsItem[];
    getTotalCost: () => number;
    stocksCurrentValueObj: { [key: string]: number };
    setStocksCurrentValueObj: (obj: { [key: string]: number }) => void;
}

interface weeklyExpensesObj {
    weekExpenses: expenseItem[];
    firstDayString: string;
    lastDayString: string;
}

export interface AuthProviderObj {
    currentUser: any;
    userLoggedIn: boolean;
    loading: boolean;
    initUser: (user: any) => void;
}
