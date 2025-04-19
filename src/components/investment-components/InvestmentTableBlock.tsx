import { Box, Stack, Typography, Button, Paper } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useState, SetStateAction } from "react";
import Textbox from "../Textbox";
import useInvestmentStore from "../../stores/InvestmentStore";

function InvestmentTableBlock() {
    const { investments, addInvestments, deleteInvestments } =
        useInvestmentStore();
    const [columns] = useState<GridColDef[]>([
        { field: "date", headerName: "Date", width: 160 },
        { field: "ticker", headerName: "Investment", width: 160 },
        { field: "amount", headerName: "Number of Shares", width: 130 },
        { field: "cost", headerName: "Cost ($)", width: 130 },
    ]);

    const [investmentName, setInvestmentName] = useState<string>("");
    const [investmentTicker, setInvestmentTicker] = useState<string>("");
    const [investmentCost, setInvestmentCost] = useState<number>(0);
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    function handleAddInvestment() {
        if (investmentName && investmentCost) {
            addInvestments([
                {
                    id: crypto.randomUUID(),
                    date: new Date().toDateString(),
                    name: investmentName,
                    cost: investmentCost,
                    amount: investmentAmount,
                    ticker: investmentTicker,
                },
            ]);
            setInvestmentName("");
            setInvestmentTicker("");
            setInvestmentCost("0");
            setInvestmentAmount("0");
        }
    }

    function handleRowSelection(
        selectedRows: string[],
        deleteInvestments: {
            (value: SetStateAction<string[]>): void;
            (arg0: never[]): void;
        }
    ) {
        deleteInvestments(selectedRows);
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
                        Enter Investment Name
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Textbox
                            id="filled-basic"
                            label="Ticker"
                            variant="filled"
                            size="small"
                            colourVariant="secondary"
                            sx={{
                                flexBasis: "25% !important",
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
                <Box sx={{ width: "100%" }}>
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
                        color="secondary"
                        size="small"
                        colourVariant="secondary"
                        sx={{
                            input: { color: "text.primary", fontSize: 24 },
                            backgroundColor: "secondary.main",
                        }}
                        onChange={(e) =>
                            setInvestmentCost(Number(e.target.value))
                        }
                    />
                </Box>
                <Box sx={{ width: "100%" }}>
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
                        color="secondary"
                        size="small"
                        colourVariant="secondary"
                        sx={{
                            input: { color: "text.primary", fontSize: 24 },
                            backgroundColor: "secondary.main",
                        }}
                        onChange={(e) =>
                            setInvestmentAmount(Number(e.target.value))
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
