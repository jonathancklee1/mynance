import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import useExpenseStore from "../../stores/ExpenseStore";
import { expenseItem, recurringExpenseItem } from "../types/interfaces";

function ExpensePieBlock() {
    const randColour = () => {
        return (
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
        );
    };
    const { recurringExpenses, expenses } = useExpenseStore();
    const expensePieData = recurringExpenses.map(
        (item: recurringExpenseItem) => {
            return {
                id: crypto.randomUUID(),
                label: item.name,
                value: item.cost,
                color: randColour(),
            };
        }
    );
    expensePieData.push(
        ...expenses.map((item: expenseItem) => {
            return {
                id: crypto.randomUUID(),
                label: item.expense,
                value: item.cost,
                color: randColour(),
            };
        })
    );
    console.log(expensePieData);
    return (
        <>
            <PieChart
                series={[
                    {
                        data: expensePieData,
                        cx: 150,
                        cy: 100,
                        valueFormatter: (params) => {
                            const percent = params.value / 100;
                            return `${(percent * 100).toFixed(1)}%`;
                        },
                    },
                ]}
                width={300}
                height={200}
                slotProps={{
                    legend: { hidden: true },
                }}
                margin={{ bottom: 40 }}
            />
            <Box style={{ width: "100%" }}>
                <Stack
                    spacing={2}
                    display={"flex"}
                    sx={{ maxHeight: 200, overflow: "auto" }}
                >
                    {expensePieData.map((asset) => (
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap={2}
                            key={asset.id}
                        >
                            <Box
                                borderRadius={"100%"}
                                width={20}
                                height={20}
                                bgcolor={asset.color}
                            ></Box>
                            <Typography
                                variant="body2"
                                color={"secondary.contrastText"}
                                flexGrow={1}
                            >
                                {asset.label}
                            </Typography>
                            <Typography variant="body1">
                                {asset.value}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </>
    );
}

export default ExpensePieBlock;
