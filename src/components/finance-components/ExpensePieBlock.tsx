import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import useExpenseStore from "../../stores/ExpenseStore";
import {
    expenseItem,
    recurringExpenseItem,
    PieChartData,
} from "../types/interfaces";

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
                            const total = expensePieData.reduce(
                                (acc, item) => acc + Number(item.value),
                                0
                            );
                            const percent = (params.value * 100) / total;
                            return `${percent.toFixed(0)}%`;
                        },
                    },
                ]}
                width={300}
                height={200}
                slotProps={{
                    legend: { hidden: true },
                    popper: {
                        sx: {
                            "& .MuiChartsTooltip-paper": {
                                backgroundColor: "primary.main",
                                fontFamily: "Helvetica, Arial, sans-serif",
                            },
                        },
                    },
                }}
                margin={{ bottom: 40 }}
            />
            <Box style={{ width: "100%" }}>
                <Stack
                    spacing={2}
                    display={"flex"}
                    sx={{
                        maxHeight: 200,
                        overflow: "auto",
                        paddingRight: 1,
                        "&::-webkit-scrollbar": {
                            backgroundColor: "primary.light",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "primary.light",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            borderRadius: "6px",
                            boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                            backgroundColor: "primary.main",
                        },
                    }}
                >
                    {expensePieData.map((asset: PieChartData) => (
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
                            <Typography variant="body2" flexGrow={1}>
                                {asset.label}
                            </Typography>
                            <Typography variant="body1">
                                ${asset.value}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </>
    );
}

export default ExpensePieBlock;
