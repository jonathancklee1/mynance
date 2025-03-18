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
