import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import Textbox from "../Textbox";
import useExpenseStore from "../../stores/ExpenseStore";

function ExpensesTableBlock() {
    const { expenses, addExpenses, deleteExpenses } = useExpenseStore();
    const [columns] = useState<GridColDef[]>([
        {
            field: "date",
            headerName: "Date",
            width: 160,
            renderCell: (params) => new Date(params.value).toDateString(),
            sortable: true,
        },
        { field: "expense", headerName: "Expense", width: 160, editable: true },
        { field: "cost", headerName: "Cost ($)", width: 130, editable: true },
    ]);

    const [expenseName, setExpenseName] = useState<string>("");
    const [expenseCost, setExpenseCost] = useState<string>("0");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    function handleAddExpense() {
        if (expenseName && expenseCost) {
            addExpenses([
                {
                    id: crypto.randomUUID(),
                    date: new Date().getTime(),
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
        deleteExpenses: (expenseArray: string[]) => void
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
                        fontWeight: "bold",
                        backgroundColor: "primary.light",
                        color: "text.secondary",
                    }}
                    onClick={handleAddExpense}
                >
                    Add Expense
                </Button>
            </Stack>

            {/* Table */}
            <Paper
                sx={{
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

                        "& div": {
                            backgroundColor: "secondary.light",
                            color: "primary.contrastText",
                            fill: "primary.contrastText",
                        },
                        "& span": {
                            color: "text.primary",
                        },

                        "& button": {
                            color: "primary.contrastText",
                        },
                        "& .css-1x4fnf-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-1x4fnf-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
                            {
                                color: "primary.light",
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
                        fontWeight: "bold",
                        backgroundColor: "primary.light",
                        color: "text.secondary",
                        "@media (min-width: 1024px)": {
                            width: "20%",
                            float: "right",
                        },
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
