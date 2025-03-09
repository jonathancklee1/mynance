import {
    Box,
    TextField,
    Typography,
    Button,
    Paper,
    Stack,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import Textbox from "../Textbox";

function ExpensesTableBlock() {
    const [columns, setColumns] = useState<GridColDef[]>([
        { field: "date", headerName: "Date", width: 130 },
        { field: "expense", headerName: "Expense", width: 130 },
        { field: "cost", headerName: "Cost ($)", width: 130 },
    ]);

    const [rows, setRows] = useState([
        { id: 1, date: new Date().toDateString(), expense: "Snow", cost: 222 },
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
                    sx={{
                        width: "100%",
                        maxWidth: "200px",
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
                    height: 400,
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
        </Box>
    );
}

export default ExpensesTableBlock;
