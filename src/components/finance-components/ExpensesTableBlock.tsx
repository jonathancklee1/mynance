import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function ExpensesTableBlock() {
    const columns: GridColDef[] = [
        { field: "date", headerName: "Date", width: 130 },
        { field: "expense", headerName: "Expense", width: 130 },
        { field: "cost", headerName: "Cost ($)", width: 130 },
    ];

    const rows = [
        { id: 1, date: 1, expense: "Snow", cost: 222 },
        { id: 2, date: 2, expense: "Lannister", cost: 22 },
        { id: 3, date: 3, expense: "Lannister", cost: 22 },
        { id: 4, date: 4, expense: "Stark", cost: 22 },
        { id: 5, date: 5, expense: "Targaryen", cost: 1 },
        { id: 6, date: 6, expense: "Melisandre", cost: 1 },
        { id: 7, date: 7, expense: "Clifford", cost: 22 },
        { id: 8, date: 8, expense: "Frances", cost: 2 },
        { id: 9, date: 9, expense: "Roxie", cost: 2 },
    ];
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "text.primary",
                    gap: 3,
                }}
            >
                <Box>
                    <Typography variant="body1" fontWeight={"bold"}>
                        Enter Expense Name
                    </Typography>
                    <TextField
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
                            marginTop: 1,
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="body1" fontWeight={"bold"}>
                        Enter Expense Cost
                    </Typography>
                    <TextField
                        id="filled-basic"
                        label="Expense Cost"
                        variant="filled"
                        fullWidth
                        color="secondary"
                        size="small"
                        sx={{
                            input: { color: "text.primary", fontSize: 24 },
                            backgroundColor: "secondary.main",
                            maxWidth: "800px",
                            marginTop: 1,
                        }}
                    />
                </Box>
                <Button variant="text" color="secondary">
                    Add Expense
                </Button>
            </Box>

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
                    sx={{
                        border: 0,
                        backgroundColor: "secondary.main",
                        "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader":
                            {
                                backgroundColor: "secondary.main",
                                color: "secondary.contrastText",
                                fill: "secondary.contrastText",
                            },
                    }}
                />
            </Paper>
        </Box>
    );
}

export default ExpensesTableBlock;
