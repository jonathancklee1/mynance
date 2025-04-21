import NavBar from "../components/NavBar";
import BottomNav from "../components/BottomNav";
import Card from "../components/Card";
import { Box, Typography } from "@mui/material";
import AssetsBlock from "../components/finance-components/AssetsBlock";
import ExpensesBlock from "../components/finance-components/ExpensesBlock";
import ProgressBlock from "../components/finance-components/ProgressBlock";
import ExpensePieBlock from "../components/finance-components/ExpensePieBlock";
import RecurringExpenseBlock from "../components/finance-components/RecurringExpenseBlock";
import ExpensesTableBlock from "../components/finance-components/ExpensesTableBlock";
import CapitalBlock from "../components/finance-components/CapitalBlock";
import useExpenseStore from "../stores/ExpenseStore";
function Finance() {
    const { getWeekExpenses } = useExpenseStore();
    const { firstDayString, lastDayString } = getWeekExpenses();
    return (
        <>
            <NavBar></NavBar>
            {/* Grid Container */}
            <Box
                sx={{
                    px: 2,
                    py: 2,
                    backgroundColor: "primary.main",
                    paddingBottom: 8,
                    gridTemplateRows: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: 2,
                    marginBottom: 8,
                    "@media (min-width: 1024px)": {
                        gridTemplateRows: "span 3 auto",
                        gap: 4,
                        px: 4,
                        py: 4,
                    },
                }}
            >
                <Box
                    sx={{
                        gridColumn: "span 12",
                        gridRow: "span 1",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                            gridRow: "span 3",
                            gridRowStart: 1,
                        },
                    }}
                >
                    <Card isEditable cardHeader="My Capital">
                        <CapitalBlock></CapitalBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                            gridRow: "span 3",
                            gridRowStart: 2,
                        },
                    }}
                >
                    <Card isEditable cardHeader="My Assets">
                        <AssetsBlock></AssetsBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumnStart: 4,
                            gridColumn: "span 8",
                            gridRowStart: 1,
                            gridRow: "span 2",
                        },
                    }}
                >
                    <Card cardHeader="My Expenses">
                        <Typography>
                            {firstDayString} - {lastDayString}
                        </Typography>
                        <ExpensesBlock></ExpensesBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 5",
                        },
                    }}
                >
                    <Card isEditable cardHeader="My Expense Progress">
                        <ProgressBlock></ProgressBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 5",
                            gridColumnStart: 6,
                        },
                    }}
                >
                    <Card cardHeader="Expense Breakdown">
                        <ExpensePieBlock></ExpensePieBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 6",
                        },
                    }}
                >
                    <Card isEditable cardHeader="Recurring Expenses">
                        <RecurringExpenseBlock></RecurringExpenseBlock>
                    </Card>
                </Box>
                <Box sx={{ gridColumn: "span 12" }}>
                    <ExpensesTableBlock></ExpensesTableBlock>
                </Box>
            </Box>
            <BottomNav></BottomNav>
        </>
    );
}

export default Finance;
