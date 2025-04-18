import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SetStateAction, useState } from "react";
import Textbox from "../Textbox";
import useExpenseStore from "../../stores/ExpenseStore";

function ExpensesTableBlock() {
    const { expenses, addExpenses, deleteExpenses } = useExpenseStore();
    const [columns] = useState<GridColDef[]>([
        { field: "date", headerName: "Date", width: 160 },
        { field: "expense", headerName: "Expense", width: 160 },
        { field: "cost", headerName: "Cost ($)", width: 130 },
    ]);

    const [expenseName, setExpenseName] = useState<string>("");
    const [expenseCost, setExpenseCost] = useState<string>("0");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    function handleAddExpense() {
        if (expenseName && expenseCost) {
            addExpenses([
                {
                    id: crypto.randomUUID(),
                    date: new Date().toDateString(),
                    expense: expenseName,
                    cost: expenseCost,
                },
            ]);
            setExpenseName("");
            setExpenseCost("0");
        }
    }

    function handleRowSelection(
        selectedRows: string[],
        deleteExpenses: {
            (value: SetStateAction<string[]>): void;
            (arg0: never[]): void;
        }
    ) {
        deleteExpenses(selectedRows);
    }
    return (
        <Box>
            <Stack
                gap={2}
                sx={{
                    color: "text.primary",
                    width: "100%",
                    "@media (min-width: 1024px)": { flexDirection: "row" },
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        marginBottom={1}
                    >
                        Enter Expense Name
                    </Typography>
                    <Textbox
                        id="filled-basic"
                        label="Expense Name"
                        variant="filled"
                        color="secondary"
                        fullWidth
                        size="small"
                        colourVariant="secondary"
                        sx={{
                            input: { color: "text.primary", fontSize: 24 },
                            backgroundColor: "secondary.main",
                        }}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        marginBottom={1}
                    >
                        Enter Expense Cost
                    </Typography>
                    <Textbox
                        id="filled-basic"
                        label="Expense Cost"
                        variant="filled"
                        type="number"
                        fullWidth
                        color="secondary"
                        size="small"
                        colourVariant="secondary"
                        sx={{
                            input: { color: "text.primary", fontSize: 24 },
                            backgroundColor: "secondary.main",
                        }}
                        onChange={(e) => setExpenseCost(e.target.value)}
                    />
                </Box>
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    sx={{
                        width: "100%",
                        height: "60px",
                        marginTop: "auto",
                    }}
                    onClick={handleAddExpense}
                >
                    Add Expense
                </Button>
            </Stack>

            {/* Table */}

            <Paper
                sx={{
                    // height: 400,
                    width: "100%",
                    marginTop: 4,
                    backgroundColor: "secondary.main",
                }}
            >
                <DataGrid
                    rows={expenses}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={(e) => {
                        const selectedRows = e.map(String);
                        setSelectedRows(selectedRows);
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "date",
                                    sort: "desc",
                                },
                            ],
                        },
                    }}
                    sx={{
                        border: 0,
                        backgroundColor: "secondary.main",
                        "& div": {
                            backgroundColor: "secondary.main",
                            color: "secondary.contrastText",
                            fill: "secondary.contrastText",
                        },

                        "& button": {
                            color: "secondary.contrastText",
                        },
                    }}
                />
            </Paper>
            {selectedRows.length > 0 && (
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    sx={{
                        width: "100%",
                        height: "60px",
                        marginTop: 2,
                    }}
                    onClick={() =>
                        handleRowSelection(selectedRows, deleteExpenses)
                    }
                >
                    Delete Selected Expenses
                </Button>
            )}
        </Box>
    );
}

export default ExpensesTableBlock;
