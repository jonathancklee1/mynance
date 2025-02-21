import { BarChart } from "@mui/x-charts/BarChart/BarChart";

function ExpensesBlock() {
    const weeklyExpenseData = [
        { day: "Sun", amount: 10 },
        { day: "Mon", amount: 15 },
        { day: "Tue", amount: 20 },
        { day: "Wed", amount: 25 },
        { day: "Thu", amount: 30 },
        { day: "Fri", amount: 35 },
        { day: "Sat", amount: 40 },
    ];
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

                        data: weeklyExpenseData.map((item) => item.day),
                    },
                ]}
                series={[
                    { data: weeklyExpenseData.map((item) => item.amount) },
                ]}
                width={300}
                height={250}
                sx={{
                    ".MuiChartsAxis-label": {
                        transform: "translate(-10px, 0)",
                    },
                }}
            />
        </>
    );
}

export default ExpensesBlock;
