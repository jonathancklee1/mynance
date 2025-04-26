import { BarChart } from "@mui/x-charts/BarChart/BarChart";
import useExpenseStore from "../../stores/ExpenseStore";
import { expenseItem } from "../types/interfaces";

interface ExpenseBlockData {
    day: string;
    amount: number;
}
function ExpensesBlock() {
    const { getWeekExpenses } = useExpenseStore();
    const { weekExpenses, firstDayOfWeek, lastDayOfWeek } = getWeekExpenses();
    const initialExpenseData = [
        { day: "Sun", amount: 0 },
        { day: "Mon", amount: 0 },
        { day: "Tue", amount: 0 },
        { day: "Wed", amount: 0 },
        { day: "Thu", amount: 0 },
        { day: "Fri", amount: 0 },
        { day: "Sat", amount: 0 },
    ];
    const weeklyExpenseData = weekExpenses.reduce(
        (acc: ExpenseBlockData[], expense: expenseItem) => {
            const expenseDay = new Date(expense.date)
                .toDateString()
                .split(" ")[0]
                .toString();
            acc.forEach((_, i) => {
                if (acc[i].day === expenseDay) {
                    acc[i].amount += parseInt(expense.cost);
                }
            });
            return acc;
        },
        initialExpenseData
    );

    return (
        <>
            <BarChart
                yAxis={[
                    {
                        label: "Expenses ($)",
                    },
                ]}
                xAxis={[
                    {
                        label: "Day of week",
                        scaleType: "band",

                        data: weeklyExpenseData.map(
                            (item: ExpenseBlockData) => item.day
                        ),
                    },
                ]}
                series={[
                    {
                        data: weeklyExpenseData.map(
                            (item: ExpenseBlockData) => item.amount
                        ),
                    },
                ]}
                sx={{
                    ".MuiChartsAxis-label": {
                        transform: "translate(-10px, 0)",
                    },
                }}
                height={400}
            />
        </>
    );
}

export default ExpensesBlock;
