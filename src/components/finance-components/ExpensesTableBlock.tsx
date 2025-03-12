import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SetStateAction, useState } from "react";
import Textbox from "../Textbox";

interface rowData {
    id: number;
    date: string;
    expense: string;
    cost: number;
}
function ExpensesTableBlock() {
    const [columns] = useState<GridColDef[]>([
        { field: "date", headerName: "Date", width: 130 },
        { field: "expense", headerName: "Expense", width: 130 },
        { field: "cost", headerName: "Cost ($)", width: 130 },
    ]);

    const [rows, setRows] = useState([
        {
            id: 100,
            date: new Date().toDateString(),
            expense: "Snow",
            cost: 222,
        },
        {
            id: 2,
            date: new Date().toDateString(),
            expense: "Lannister",
            cost: 22,
        },
        {
            id: 3,
            date: new Date().toDateString(),
            expense: "Lannister",
            cost: 22,
        },
        { id: 4, date: new Date().toDateString(), expense: "Stark", cost: 22 },
        {
            id: 5,
            date: new Date().toDateString(),
            expense: "Targaryen",
            cost: 1,
        },
        {
            id: 6,
            date: new Date().toDateString(),
            expense: "Melisandre",
            cost: 1,
        },
        {
            id: 7,
            date: new Date().toDateString(),
            expense: "Clifford",
            cost: 22,
        },
        { id: 8, date: new Date().toDateString(), expense: "Frances", cost: 2 },
        { id: 9, date: new Date().toDateString(), expense: "Roxie", cost: 2 },
    ]);

    const [expenseName, setExpenseName] = useState<string>("");
    const [expenseCost, setExpenseCost] = useState<number>(0);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    function handleAddExpense() {
        if (expenseName && expenseCost) {
            setRows([
                {
                    id: rows.length + 1,
                    date: new Date().toDateString(),
                    expense: expenseName,
                    cost: expenseCost,
                },
                ...rows,
            ]);
            setExpenseName("");
            setExpenseCost(0);
        }
    }

    function handleRowSelection(
        selectedRows: number[],
        rows: rowData[],
        setRows: {
            (
                value: SetStateAction<
                    {
                        id: number;
                        date: string;
                        expense: string;
                        cost: number;
                    }[]
                >
            ): void;
            (arg0: never[]): void;
        }
    ) {
        const newRows = rows.filter((row) => !selectedRows.includes(row.id));
        setRows(newRows);
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
                        sx={{
                            input: { color: "text.primary", fontSize: 24 },
                            backgroundColor: "secondary.main",
                            maxWidth: "800px",
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
                        sx={{
                            input: { color: "text.primary", fontSize: 24 },
                            backgroundColor: "secondary.main",
                            maxWidth: "800px",
                        }}
                        onChange={(e) =>
                            setExpenseCost(parseInt(e.target.value))
                        }
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
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={(e) => {
                        const selectedRows = e.map(Number);
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
                        handleRowSelection(selectedRows, rows, setRows)
                    }
                >
                    Delete Selected Expenses
                </Button>
            )}
        </Box>
    );
}

export default ExpensesTableBlock;
