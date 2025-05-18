import {
    Box,
    Stack,
    Typography,
    Button,
    Paper,
    Alert,
    Snackbar,
    SnackbarCloseReason,
} from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Textbox from "../Textbox";
import useInvestmentStore from "../../stores/InvestmentStore";

function InvestmentTableBlock() {
    const { investments, addInvestments, deleteInvestments } =
        useInvestmentStore();
    const [columns] = useState<GridColDef[]>([
        {
            field: "date",
            headerName: "Date",
            width: 160,
            sortable: true,
            renderCell: (params) => new Date(params.value).toDateString(),
        },
        { field: "ticker", headerName: "Investment", width: 160 },
        { field: "amount", headerName: "Number of Shares", width: 130 },
        { field: "cost", headerName: "Cost ($)", width: 130 },
    ]);

    const [investmentName, setInvestmentName] = useState<string>("");
    const [investmentTicker, setInvestmentTicker] = useState<string>("");
    const [investmentCost, setInvestmentCost] = useState<number>(0);
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [snackOpen, setSnackOpen] = useState(false);

    function handleAddInvestment() {
        if (
            investmentName &&
            investmentTicker &&
            investmentAmount &&
            investmentCost
        ) {
            addInvestments([
                {
                    id: crypto.randomUUID(),
                    date: new Date().getTime().toString(),
                    name: investmentName,
                    cost: investmentCost,
                    amount: investmentAmount,
                    ticker: investmentTicker,
                },
            ]);
        } else {
            setSnackOpen(true);
        }
    }
    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };
    function handleRowSelection(
        selectedRows: string[],
        deleteInvestments: (expenseArray: string[]) => void
    ) {
        deleteInvestments(selectedRows);
    }
    return (
        <Box>
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Please fill out all fields
                </Alert>
            </Snackbar>
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
                        Enter Investment Name
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Textbox
                            id="filled-basic"
                            label="Ticker"
                            variant="filled"
                            size="small"
                            colourVariant="secondary"
                            sx={{
                                flexBasis: "50% !important",
                            }}
                            onChange={(e) =>
                                setInvestmentTicker(
                                    e.target.value.toUpperCase()
                                )
                            }
                        />
                        <Textbox
                            id="filled-basic"
                            label="Investment Name"
                            variant="filled"
                            color="secondary"
                            size="small"
                            fullWidth
                            colourVariant="secondary"
                            onChange={(e) => setInvestmentName(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box sx={{ "@media (min-width: 1024px)": { width: "70%" } }}>
                    <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        marginBottom={1}
                    >
                        Enter Investment Cost
                    </Typography>
                    <Textbox
                        id="filled-basic"
                        label="Investment Cost"
                        variant="filled"
                        type="number"
                        fullWidth
                        size="small"
                        colourVariant="secondary"
                        onChange={(e) =>
                            setInvestmentCost(Number(e.target.value))
                        }
                    />
                </Box>
                <Box sx={{ "@media (min-width: 1024px)": { width: "70%" } }}>
                    <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        marginBottom={1}
                    >
                        Enter Investment Amount
                    </Typography>
                    <Textbox
                        id="filled-basic"
                        label="Investment Amount"
                        variant="filled"
                        type="number"
                        fullWidth
                        size="small"
                        colourVariant="secondary"
                        onChange={(e) =>
                            setInvestmentAmount(Number(e.target.value))
                        }
                    />
                </Box>
                <Button
                    variant="text"
                    fullWidth
                    sx={{
                        height: "60px",
                        marginTop: "auto",
                        fontWeight: "bold",
                        backgroundColor: "primary.light",
                        "@media (min-width: 1024px)": { width: "70%" },
                    }}
                    onClick={handleAddInvestment}
                >
                    Add Investment
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
                    rows={investments}
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
                            color: "text.primary",
                            fill: "text.primary",
                        },
                        "& span": {
                            color: "text.primary",
                        },
                        "& button": {
                            color: "text.primary",
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
                        handleRowSelection(selectedRows, deleteInvestments)
                    }
                >
                    Delete Selected Investments
                </Button>
            )}
        </Box>
    );
}

export default InvestmentTableBlock;
